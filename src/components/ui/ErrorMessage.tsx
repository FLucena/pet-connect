import React from 'react';
import { IApiError } from '@/utils/errorHandler';

interface ErrorMessageProps {
  error: IApiError | Error | string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const message = typeof error === 'string' ? error : error.message;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">¡Ups! Algo salió mal</h4>
            <p>{message}</p>
            {onRetry && (
              <>
                <hr />
                <p className="mb-0">
                  <button 
                    className="btn btn-primary"
                    onClick={onRetry}
                  >
                    Intentar de nuevo
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 