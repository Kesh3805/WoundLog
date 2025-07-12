const mongoose = require('mongoose');

const emotionTagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
 
module.exports = mongoose.model('EmotionTag', emotionTagSchema); 