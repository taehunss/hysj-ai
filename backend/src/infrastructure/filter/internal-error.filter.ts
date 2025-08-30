import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LOGGER, Logger } from 'src/common/logger/logger.interface';

@Catch(Error)
@Injectable()
export class InternalErrorFilter implements ExceptionFilter {
  constructor(
    @Inject(LOGGER)
    private readonly logger: Logger,
  ) {}

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
