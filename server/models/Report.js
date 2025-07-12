const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BleedPost', required: true },
  reporterId: { type: mongoose.Schema.Types.Mixed, required: false }, // Can be ObjectId or string for anonymous
  reason: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'actioned', 'dismissed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema); 