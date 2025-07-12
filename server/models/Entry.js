const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String }, // Markdown
  emotionTags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isEncrypted: { type: Boolean, default: false },
  encryptedData: { type: String }, // if LockBox
});

module.exports = mongoose.model('Entry', entrySchema); 