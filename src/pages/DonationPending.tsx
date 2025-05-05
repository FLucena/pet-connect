import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Clock } from 'lucide-react';

const DonationPending: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shelterId = searchParams.get('shelterId');
  const amount = searchParams.get('amount');

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="text-center">
            <Card.Body className="py-5">
              <Clock size={64} className="text-warning mb-4" />
              <h1 className="h2 mb-4">Donación en proceso</h1>
              <p className="lead mb-4">
                Tu donación de ${amount} está siendo procesada.
                Te notificaremos por email cuando se complete el proceso.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link
                  to={shelterId ? `/refugios/${shelterId}` : '/'}
                  className="btn btn-primary btn-lg"
                >
                  Volver al refugio
                </Link>
                <Link
                  to="/"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Ir al inicio
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonationPending; 