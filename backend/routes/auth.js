const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'replace-with-secure-secret';

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: '7d'
  });
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existing = users.find((user) => user.email === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'Email already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `u${Date.now()}`,
    name,
    email: email.toLowerCase(),
    passwordHash
  };
  users.push(user);

  res.json({ token: generateToken(user), user: { id: user.id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({ token: generateToken(user), user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
