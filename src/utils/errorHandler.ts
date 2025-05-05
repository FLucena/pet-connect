export interface IApiError {
  message: string;
  status?: number;
  code?: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
}

export enum ApiErrorCode {
  INVALID_API_KEY = 'INVALID_API_KEY',
  MISSING_API_KEY = 'MISSING_API_KEY',
  EXPIRED_API_KEY = 'EXPIRED_API_KEY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class ApiError extends Error implements IApiError {
  status?: number;
  code?: string;
  retryable?: boolean;
  details?: Record<string, unknown>;

  constructor(
    message: string, 
    status?: number, 
    code: ApiErrorCode = ApiErrorCode.UNKNOWN_ERROR,
    retryable: boolean = false,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.retryable = retryable;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    // Handle specific API key related errors
    if (error.message.includes('API key')) {
      if (error.message.includes('invalid')) {
        return new ApiError(
          'La clave de API proporcionada no es válida',
          401,
          ApiErrorCode.INVALID_API_KEY,
          false
        );
      }
      if (error.message.includes('expired')) {
        return new ApiError(
          'La clave de API ha expirado',
          401,
          ApiErrorCode.EXPIRED_API_KEY,
          false
        );
      }
      if (error.message.includes('quota')) {
        return new ApiError(
          'Se ha excedido la cuota de la API',
          429,
          ApiErrorCode.QUOTA_EXCEEDED,
          true,
          { retryAfter: 3600 } // 1 hour in seconds
        );
      }
      if (error.message.includes('rate limit')) {
        return new ApiError(
          'Se ha excedido el límite de solicitudes',
          429,
          ApiErrorCode.RATE_LIMIT_EXCEEDED,
          true,
          { retryAfter: 60 } // 1 minute in seconds
        );
      }
    }
    return new ApiError(error.message);
  }

  return new ApiError('An unexpected error occurred');
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const isRetryableError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return error.retryable ?? false;
  }
  return false;
};

export const getRetryAfter = (error: unknown): number | null => {
  if (error instanceof ApiError && error.details?.retryAfter) {
    return error.details.retryAfter as number;
  }
  return null;
}; 