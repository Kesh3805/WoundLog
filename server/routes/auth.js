const express = require('express');
const router = express.Router();
const { z } = require('zod');
const User = require('../models/User');
const { hashPassword, comparePassword, signToken } = require('../utils/auth');

// Zod schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const loginSchema = registerSchema;

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = registerSchema.parse(req.body);
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await hashPassword(password);
    const user = await User.create({ email, passwordHash });
    const token = signToken({ userId: user._id });
    res.status(201).json({ token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({ userId: user._id });
    res.json({ token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router; 