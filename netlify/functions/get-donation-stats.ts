import { Handler } from '@netlify/functions';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! 
});

const handler: Handler = async () => {
  try {
    const payment = new Payment(client);
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);

    // Get all payments from the last 6 months
    const response = await payment.search({
      options: {
        filters: {
          date_created: {
            from: sixMonthsAgo.toISOString(),
            to: today.toISOString()
          },
          status: 'approved'
        }
      }
    });

    if (!response.results) {
      throw new Error('No results found in payment response');
    }

    const payments = response.results;
    
    // Calculate statistics
    const stats = {
      totalDonations: payments.length,
      totalAmount: payments.reduce((sum, p) => sum + (p.transaction_amount || 0), 0),
      monthlyDonations: payments.filter(p => p.metadata?.isMonthly).length,
      monthlyAmount: payments
        .filter(p => p.metadata?.isMonthly)
        .reduce((sum, p) => sum + (p.transaction_amount || 0), 0),
      shelterDonations: payments.filter(p => p.metadata?.type === 'shelter').length,
      platformDonations: payments.filter(p => p.metadata?.type === 'platform').length,
      recentDonations: payments
        .slice(0, 10)
        .map(p => ({
          id: p.id,
          amount: p.transaction_amount || 0,
          type: p.metadata?.type || 'platform',
          shelterName: p.metadata?.shelterName,
          isMonthly: p.metadata?.isMonthly || false,
          timestamp: p.date_created
        })),
      monthlyTrend: Array.from({ length: 6 }, (_, i) => {
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthPayments = payments.filter(p => {
          if (!p.date_created) return false;
          const paymentDate = new Date(p.date_created);
          return paymentDate.getMonth() === month.getMonth() && 
                 paymentDate.getFullYear() === month.getFullYear();
        });
        
        return {
          month: month.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' }),
          amount: monthPayments.reduce((sum, p) => sum + (p.transaction_amount || 0), 0),
          count: monthPayments.length
        };
      }).reverse()
    };

    return {
      statusCode: 200,
      body: JSON.stringify(stats),
    };
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching donation stats' }),
    };
  }
};

export { handler }; 