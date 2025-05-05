import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DonationStats {
  totalDonations: number;
  totalAmount: number;
  monthlyDonations: number;
  monthlyAmount: number;
  shelterDonations: number;
  platformDonations: number;
  recentDonations: Array<{
    id: string;
    amount: number;
    type: 'shelter' | 'platform';
    shelterName?: string;
    isMonthly: boolean;
    timestamp: string;
  }>;
  monthlyTrend: Array<{
    month: string;
    amount: number;
    count: number;
  }>;
}

const DonationDashboard: React.FC = () => {
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-donation-stats');
        if (!response.ok) throw new Error('Error fetching donation stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Error al cargar las estadísticas de donaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Panel de Donaciones</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Recaudado</Card.Title>
              <Card.Text className="display-6">
                ${stats.totalAmount.toLocaleString('es-AR')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Donaciones Totales</Card.Title>
              <Card.Text className="display-6">
                {stats.totalDonations}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Donaciones Mensuales</Card.Title>
              <Card.Text className="display-6">
                {stats.monthlyDonations}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Monto Mensual</Card.Title>
              <Card.Text className="display-6">
                ${stats.monthlyAmount.toLocaleString('es-AR')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Tendencia Mensual</Card.Title>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8884d8" name="Monto ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Distribución</Card.Title>
              <div className="d-flex flex-column gap-3">
                <div>
                  <h6>Donaciones a Refugios</h6>
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${(stats.shelterDonations / stats.totalDonations) * 100}%` }}
                    >
                      {stats.shelterDonations}
                    </div>
                  </div>
                </div>
                <div>
                  <h6>Donaciones a la Plataforma</h6>
                  <div className="progress">
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: `${(stats.platformDonations / stats.totalDonations) * 100}%` }}
                    >
                      {stats.platformDonations}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title>Donaciones Recientes</Card.Title>
          <Table responsive>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Tipo</th>
                <th>Refugio</th>
                <th>Frecuencia</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentDonations.map((donation) => (
                <tr key={donation.id}>
                  <td>{new Date(donation.timestamp).toLocaleDateString()}</td>
                  <td>${donation.amount.toLocaleString('es-AR')}</td>
                  <td>{donation.type === 'shelter' ? 'Refugio' : 'Plataforma'}</td>
                  <td>{donation.shelterName || '-'}</td>
                  <td>{donation.isMonthly ? 'Mensual' : 'Única vez'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DonationDashboard; 