import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TSLogger } from 'src/infrastructure/logger/logger';

@Catch(Error)
@Injectable()
export class InternalErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: TSLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = this.resolveStatusCode(exception);
    this.logger.error(exception.message, exception.stack);
    if (response.headersSent) {
      this.logger.error(
        `Headers already sent for path: ${request.url}. Could not send error response.`,
        exception.stack,
      );
      return;
    }

    response.status(statusCode).json({
      name: exception.name,
      statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  resolveStatusCode(exception: Error) {
    if (exception.name === 'UnauthorizedException') {
      return 401;
    }
    return 500;
  }
}
