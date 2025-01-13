export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', details?: any) {
    super(404, message, 'NOT_FOUND', details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: any) {
    super(400, message, 'VALIDATION_ERROR', details);
  }
}

export class ProcessingError extends AppError {
  constructor(message: string = 'Processing failed', details?: any) {
    super(500, message, 'PROCESSING_ERROR', details);
  }
} 