import { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        code: err.code,
        status: err.status
      }
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: err.message,
        code: 'VALIDATION_ERROR',
        status: 400
      }
    });
  }

  return res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
      status: 500
    }
  });
}; 