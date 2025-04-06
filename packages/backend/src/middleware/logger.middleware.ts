import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url, ip } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url} from ${ip}`);
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${res.statusCode} (${duration}ms)`);
    return originalSend.call(this, body);
  };

  next();
}; 