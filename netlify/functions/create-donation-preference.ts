import { Handler } from '@netlify/functions';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! 
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, shelterId, shelterName, type, isMonthly } = JSON.parse(event.body!);
    
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: `${type === 'shelter' ? `Donación a ${shelterName}` : 'Donación a Pet Connect'}${isMonthly ? ' (Mensual)' : ''}`,
            unit_price: Number(amount),
            quantity: 1,
            currency_id: 'ARS',
          }
        ],
        back_urls: {
          success: `${process.env.URL}/donation/success`,
          failure: `${process.env.URL}/donation/failure`,
          pending: `${process.env.URL}/donation/pending`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.URL}/.netlify/functions/donation-webhook`,
        metadata: {
          shelterId,
          shelterName,
          type,
          isMonthly,
          amount,
          timestamp: new Date().toISOString(),
        },
        payment_methods: {
          installments: 1,
        },
        ...(isMonthly && {
          payment_methods: {
            excluded_payment_types: [
              { id: 'ticket' },
              { id: 'atm' }
            ]
          }
        })
      }
    });

    // Track donation attempt
    await fetch('https://api.mixpanel.com/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.MIXPANEL_TOKEN! + ':').toString('base64')}`
      },
      body: JSON.stringify({
        event: 'Donation Attempt',
        properties: {
          distinct_id: shelterId || 'platform',
          amount,
          type,
          isMonthly,
          shelterName,
          timestamp: new Date().toISOString(),
          token: process.env.MIXPANEL_TOKEN
        }
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ preferenceId: result.id }),
    };
  } catch (error) {
    console.error('Error creating preference:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating preference' }),
    };
  }
};

export { handler }; 