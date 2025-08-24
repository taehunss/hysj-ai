import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TSLogger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: TSLogger) {
    this.logger.setContext(this.constructor.name);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    try {
      let requestTimestamp: number;
      let responseTimestamp: number;

      if (this.isHealthCheck(request)) {
        next();
        return;
      }

      if (
        request.originalUrl.includes('v1/clinic/log') ||
        request.originalUrl.includes('logs')
      ) {
        next();
        return;
      }

      const oldWrite = response.write;
      const oldEnd = response.end;
      const chunks: any[] = [];

      // Moved from 'close' event call-back
      {
        requestTimestamp = Date.now();
        this.requestLogging(request);
      }

      response.write = (...args: any[]): boolean => {
        chunks.push(Buffer.from(args[0]));
        oldWrite.apply(response, args);
        return true;
      };

      response.end = (...args: any[]) => {
        if (args[0]) {
          chunks.push(Buffer.from(args[0]));
        }
        responseTimestamp = Date.now();
        return oldEnd.apply(response, args);
      };

      response.on('finish', () => {
        const timeTaken = `${responseTimestamp - requestTimestamp}ms`;
        this.responseLogging(request, timeTaken);
      });

      next();
    } catch (error) {
      this.logger.error(error, error.stack);
      next();
    }
  }

  private requestLogging(request: Request): void {
    this.logger.setContext('Request');
    this.logger.log(
      `${request.method} | ${this.getClientIp(request)} | ${request.originalUrl}`,
    );
  }

  private responseLogging(request: Request, timeTaken: string): void {
    this.logger.setContext('Response');
    this.logger.log(
      `${request.method} | ${this.getClientIp(request)} | ${request.originalUrl} | ${timeTaken}`,
    );
  }

  private getClientIp(req: Request): string | unknown {
    const ip = req.headers['x-forwarded-for'] || req.headers['host'];
    if (!ip) {
      return 'unknown';
    }
    return ip as string;
  }

  private isHealthCheck(req: Request): boolean {
    return (
      req.originalUrl.includes('health') ||
      req.originalUrl.includes('aliveness')
    );
  }
}
