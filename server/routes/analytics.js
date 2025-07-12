const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const auth = require('../middleware/auth');

// GET /analytics/moods
router.get('/moods', auth, async (req, res) => {
  const userId = req.user.userId;
  const agg = await Entry.aggregate([
    { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
    { $unwind: '$emotionTags' },
    { $group: { _id: '$emotionTags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  res.json(agg);
});

module.exports = router; 