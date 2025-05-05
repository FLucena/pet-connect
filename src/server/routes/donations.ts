import express from 'express';
import mercadopago from 'mercadopago';
import { config } from 'dotenv';

config();

const router = express.Router();

// Initialize Mercado Pago with your secret key
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

router.post('/create-preference', async (req, res) => {
  try {
    const { amount, shelterId, shelterName } = req.body;

    // Create a payment preference
    const preference = {
      items: [
        {
          title: `Donación a ${shelterName}`,
          unit_price: Number(amount),
          quantity: 1,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/donation/success`,
        failure: `${process.env.FRONTEND_URL}/donation/failure`,
        pending: `${process.env.FRONTEND_URL}/donation/pending`,
      },
      auto_return: 'approved',
      external_reference: shelterId,
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ preferenceId: response.body.id });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({ error: 'Error creating payment preference' });
  }
});

export default router; 