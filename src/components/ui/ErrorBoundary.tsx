import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">¡Ups! Algo salió mal</h4>
                <p>Lo sentimos, ha ocurrido un error inesperado.</p>
                <hr />
                <p className="mb-0">
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    Recargar página
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 