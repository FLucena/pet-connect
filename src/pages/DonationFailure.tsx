import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { XCircle } from 'lucide-react';

const DonationFailure: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shelterId = searchParams.get('shelterId');

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="text-center">
            <Card.Body className="py-5">
              <XCircle size={64} className="text-danger mb-4" />
              <h1 className="h2 mb-4">Lo sentimos</h1>
              <p className="lead mb-4">
                Hubo un problema al procesar tu donación.
                Por favor, intenta nuevamente o contacta con nosotros si el problema persiste.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link
                  to={shelterId ? `/refugios/${shelterId}` : '/'}
                  className="btn btn-primary btn-lg"
                >
                  Volver al refugio
                </Link>
                <Link
                  to="/contacto"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Contactar soporte
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonationFailure; 