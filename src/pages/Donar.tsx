import React, { useState } from 'react';
import { Card, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import { Heart, DollarSign } from 'lucide-react';
import DonationSection from '@/components/DonationSection';

const Donar: React.FC = () => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<string>('1000');
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleAmountChange = (amount: string) => {
    setCustomAmount(amount);
    setSelectedAmount(amount);
  };

  const handlePresetAmountClick = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const presetAmounts = ['500', '1000', '2000', '5000'];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Card className="mb-4">
            <Card.Body className="text-center py-5">
              <Heart size={48} className="text-danger mb-3" />
              <h1 className="h2 mb-3">Apoya a Pet Connect</h1>
              <p className="lead mb-4">
                Tu donación nos ayuda a mantener y mejorar la plataforma,
                conectando más mascotas con sus futuros hogares.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h2 className="h4 mb-4">Elige tu donación</h2>
              
              <Form.Group className="mb-4">
                <Form.Label>Tipo de donación</Form.Label>
                <div className="d-flex gap-3">
                  <Button
                    variant={donationType === 'one-time' ? 'primary' : 'outline-primary'}
                    onClick={() => setDonationType('one-time')}
                    className="flex-grow-1"
                  >
                    Única vez
                  </Button>
                  <Button
                    variant={donationType === 'monthly' ? 'primary' : 'outline-primary'}
                    onClick={() => setDonationType('monthly')}
                    className="flex-grow-1"
                  >
                    Mensual
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Monto de la donación (ARS)</Form.Label>
                <Row className="g-2 mb-3">
                  {presetAmounts.map((amount) => (
                    <Col key={amount} xs={6} sm={3}>
                      <Button
                        variant={selectedAmount === amount ? 'primary' : 'outline-primary'}
                        className="w-100"
                        onClick={() => handlePresetAmountClick(amount)}
                      >
                        ${amount}
                      </Button>
                    </Col>
                  ))}
                </Row>
                <InputGroup>
                  <InputGroup.Text>
                    <DollarSign size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Otro monto"
                    value={customAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    min="100"
                    step="100"
                  />
                </InputGroup>
              </Form.Group>

              <DonationSection
                type="platform"
                amount={selectedAmount}
                onAmountChange={handleAmountChange}
              />
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <h3 className="h5 mb-3">¿Cómo se utilizan las donaciones?</h3>
              <ul className="list-unstyled">
                <li className="mb-2">✓ Mantenimiento y mejora de la plataforma</li>
                <li className="mb-2">✓ Desarrollo de nuevas funcionalidades</li>
                <li className="mb-2">✓ Marketing para conectar más mascotas con adoptantes</li>
                <li className="mb-2">✓ Soporte técnico para refugios y usuarios</li>
                <li className="mb-2">✓ Campañas de concientización sobre adopción responsable</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <h3 className="h5 mb-4">Métodos de pago seguros</h3>
              <div className="d-flex justify-content-center gap-4 align-items-center">
                <img 
                  src="/src/assets/MP.svg" 
                  alt="Mercado Pago" 
                  style={{ height: '40px' }}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donar; 