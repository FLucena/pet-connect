import React, { useEffect, useState } from 'react';
import { IApiError, isRetryableError, getRetryAfter } from '@/utils/errorHandler';

interface ErrorMessageProps {
  error: IApiError | Error | string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);
  const message = typeof error === 'string' ? error : error.message;
  const isRetryable = isRetryableError(error);
  const retryAfter = getRetryAfter(error);

  useEffect(() => {
    if (retryAfter && isRetryable) {
      setRetryCountdown(retryAfter);
      const timer = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [retryAfter, isRetryable]);

  const getErrorTitle = () => {
    if (typeof error === 'string') return 'Error';
    if ('code' in error) {
      switch (error.code) {
        case 'INVALID_API_KEY':
          return 'Clave de API inválida';
        case 'MISSING_API_KEY':
          return 'Clave de API faltante';
        case 'EXPIRED_API_KEY':
          return 'Clave de API expirada';
        case 'RATE_LIMIT_EXCEEDED':
          return 'Límite de solicitudes excedido';
        case 'QUOTA_EXCEEDED':
          return 'Cuota excedida';
        default:
          return '¡Ups! Algo salió mal';
      }
    }
    return '¡Ups! Algo salió mal';
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">{getErrorTitle()}</h4>
            <p>{message}</p>
            {isRetryable && onRetry && (
              <>
                <hr />
                <p className="mb-0">
                  {retryCountdown !== null && retryCountdown > 0 ? (
                    <span className="text-muted">
                      Intenta de nuevo en {retryCountdown} segundos
                    </span>
                  ) : (
                    <button 
                      className="btn btn-primary"
                      onClick={onRetry}
                    >
                      Intentar de nuevo
                    </button>
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 