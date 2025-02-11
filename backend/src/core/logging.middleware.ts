import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(`🚀 ${method} ${url} [${res.statusCode}] - ${duration}ms`);
    });

    next();
  }
}