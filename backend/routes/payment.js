const express = require('express');
const Stripe = require('stripe');
const { products, carts } = require('../data');
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_1234567890');

router.post('/checkout', async (req, res) => {
  const { userId, paymentMethodId } = req.body;
  const cart = carts[userId] || [];

  if (!cart.length) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }

  const lineItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description
        },
        unit_amount: product.price * 100
      },
      quantity: item.quantity
    };
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: lineItems.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0),
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true
    });

    carts[userId] = [];

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
