const express = require('express');
const { carts, products } = require('../data');
const router = express.Router();

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];
  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      product,
      quantity: item.quantity
    };
  });
  res.json({ items, total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) });
});

router.post('/:userId/add', (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity = 1 } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existing = carts[userId].find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }

  res.json({ message: 'Product added to cart.', cart: carts[userId] });
});

router.post('/:userId/remove', (req, res) => {
  const userId = req.params.userId;
  const { productId } = req.body;
  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found.' });
  }

  carts[userId] = carts[userId].filter((item) => item.productId !== productId);
  res.json({ message: 'Product removed from cart.', cart: carts[userId] });
});

router.post('/:userId/update', (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;
  if (!carts[userId]) {
    return res.status(404).json({ error: 'Cart not found.' });
  }

  const item = carts[userId].find((item) => item.productId === productId);
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found.' });
  }

  item.quantity = quantity;
  res.json({ message: 'Cart updated.', cart: carts[userId] });
});

module.exports = router;
