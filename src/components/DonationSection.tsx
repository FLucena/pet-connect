import React, { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Initialize Mercado Pago with your public key
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

interface DonationSectionProps {
  type: 'shelter' | 'platform';
  shelterName?: string;
  shelterId?: string;
  amount?: string;
  onAmountChange?: (amount: string) => void;
  isMonthly?: boolean;
  onMonthlyChange?: (isMonthly: boolean) => void;
}

const DonationSection: React.FC<DonationSectionProps> = ({
  type,
  shelterName = 'Pet Connect',
  shelterId = 'platform',
  amount = '1000',
  onAmountChange,
  isMonthly = false,
  onMonthlyChange,
}) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/.netlify/functions/create-donation-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          shelterId,
          shelterName,
          type,
          isMonthly,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }

      const data = await response.json();
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error('Error creating donation preference:', error);
      setError('Hubo un error al procesar tu donación. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header>
        <h3>Apoya a {shelterName}</h3>
      </Card.Header>
      <Card.Body>
        <p className="mb-3">
          {type === 'shelter'
            ? 'Tu donación ayuda a mantener y cuidar a los animales del refugio. Cada contribución hace la diferencia en sus vidas.'
            : 'Tu donación nos ayuda a mantener y mejorar la plataforma, conectando más mascotas con sus futuros hogares.'}
        </p>
        
        <Form>
          {onMonthlyChange && (
            <Form.Group className="mb-3">
              <Form.Label>Tipo de donación</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={!isMonthly ? 'primary' : 'outline-primary'}
                  onClick={() => onMonthlyChange(false)}
                  className="flex-grow-1"
                >
                  Única vez
                </Button>
                <Button
                  variant={isMonthly ? 'primary' : 'outline-primary'}
                  onClick={() => onMonthlyChange(true)}
                  className="flex-grow-1"
                >
                  Mensual
                </Button>
              </div>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Monto de la donación (ARS)</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => onAmountChange?.(e.target.value)}
                min="100"
                step="100"
                disabled={isLoading}
              />
            </InputGroup>
          </Form.Group>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <Button 
            variant="primary" 
            onClick={handleDonation}
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : `Donar ${isMonthly ? 'mensualmente' : 'ahora'}`}
          </Button>
        </Form>

        {preferenceId && (
          <div className="mt-3">
            <Wallet 
              initialization={{ preferenceId: preferenceId }}
              customization={{ valueProp: 'smart_option' }}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DonationSection; 