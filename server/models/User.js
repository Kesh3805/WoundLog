const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  settings: {
    darkMode: { type: Boolean, default: false },
    unlockables: [{ type: String }],
  },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  banned: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema); 