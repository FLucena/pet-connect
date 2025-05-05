import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body!);
    const { action, data: paymentData } = data;

    if (action === 'payment.created' || action === 'payment.updated') {
      const { metadata, status } = paymentData;
      const { shelterId, shelterName, type, isMonthly, amount } = metadata;

      // Track successful donation
      if (status === 'approved') {
        // Send email to donor
        await transporter.sendMail({
          from: `"Pet Connect" <${process.env.EMAIL_USER}>`,
          to: paymentData.payer.email,
          subject: '¡Gracias por tu donación!',
          html: `
            <h1>¡Gracias por tu donación!</h1>
            <p>Hemos recibido tu donación de $${amount} ${isMonthly ? 'mensual' : ''}.</p>
            <p>${type === 'shelter' 
              ? `Tu contribución ayudará a ${shelterName} a seguir cuidando de los animales.`
              : 'Tu contribución nos ayuda a mantener y mejorar la plataforma.'}</p>
            <p>Recibirás un recibo por email en los próximos minutos.</p>
            <p>¡Gracias por tu apoyo!</p>
          `,
        });

        // Send email to admin
        await transporter.sendMail({
          from: `"Pet Connect" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: 'Nueva donación recibida',
          html: `
            <h1>Nueva donación recibida</h1>
            <p><strong>Monto:</strong> $${amount}</p>
            <p><strong>Tipo:</strong> ${type === 'shelter' ? 'Refugio' : 'Plataforma'}</p>
            <p><strong>Frecuencia:</strong> ${isMonthly ? 'Mensual' : 'Única vez'}</p>
            ${type === 'shelter' ? `<p><strong>Refugio:</strong> ${shelterName}</p>` : ''}
            <p><strong>Donante:</strong> ${paymentData.payer.email}</p>
            <p><strong>ID de pago:</strong> ${paymentData.id}</p>
          `,
        });

        // Track in Mixpanel
        await fetch('https://api.mixpanel.com/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(process.env.MIXPANEL_TOKEN! + ':').toString('base64')}`
          },
          body: JSON.stringify({
            event: 'Donation Completed',
            properties: {
              distinct_id: shelterId || 'platform',
              amount,
              type,
              isMonthly,
              shelterName,
              paymentId: paymentData.id,
              timestamp: new Date().toISOString(),
              token: process.env.MIXPANEL_TOKEN
            }
          })
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error processing webhook' }),
    };
  }
};

export { handler }; 