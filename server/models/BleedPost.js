const mongoose = require('mongoose');

const bleedPostSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // renamed from userId
  content: { type: String, required: true },
  emotionTags: [{ type: String }],
  category: { type: String, enum: ['Poetry', 'Rant', 'Confession', 'Story', 'Thought', 'Other'], default: 'Other' },
  createdAt: { type: Date, default: Date.now },
  heartCount: { type: Number, default: 0 },
  heartedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // unique per user
  hidden: { type: Boolean, default: false },
});
// Index for fast lookup of hearts
bleedPostSchema.index({ _id: 1, heartedBy: 1 });

module.exports = mongoose.model('BleedPost', bleedPostSchema); 