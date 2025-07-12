const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

module.exports = {
  hashPassword: async (password) => bcrypt.hash(password, 10),
  comparePassword: async (password, hash) => bcrypt.compare(password, hash),
  signToken: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }),
  verifyToken: (token) => jwt.verify(token, JWT_SECRET),
}; 