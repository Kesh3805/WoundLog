const express = require('express');
const router = express.Router();
const { z } = require('zod');
const BleedPost = require('../models/BleedPost');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Report = require('../models/Report');
const { generateGeminiPrompt } = require('../utils/gemini');

// Zod schema for BleedPost
const bleedSchema = z.object({
  content: z.string().min(1),
  emotionTags: z.array(z.string()).optional(),
  category: z.enum(['Poetry', 'Rant', 'Confession', 'Story', 'Thought', 'Other']).optional(),
});

// List all bleed posts (public, paginated, not hidden)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const filter = { hidden: false };
  
  // Filter by emotion tag
  if (req.query.emotion) {
    filter.emotionTags = req.query.emotion;
  }
  
  // Filter by category
  if (req.query.category) {
    filter.category = req.query.category;
  }
  
  // Search by content
  if (req.query.search) {
    filter.content = { $regex: req.query.search, $options: 'i' };
  }
  
  let sort = { createdAt: -1 };
  if (req.query.sort === 'top') {
    sort = { heartCount: -1, createdAt: -1 };
  }
  
  const posts = await BleedPost.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const total = await BleedPost.countDocuments(filter);
  res.json({ posts, total, page, pages: Math.ceil(total / limit) });
});

// List top posts by heart count (not hidden)
router.get('/top', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const posts = await BleedPost.find({ hidden: false })
    .sort({ heartCount: -1, createdAt: -1 })
    .limit(limit);
  res.json(posts);
});

// Get all posts liked by the current user (move this up before /:id)
router.get('/liked', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const posts = await BleedPost.find({ heartedBy: userId, hidden: false }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error in /bleed/liked:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Get single bleed post
router.get('/:id', async (req, res) => {
  const post = await BleedPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// Report a post (store report)
router.post('/:id/report', async (req, res) => {
  // Check if this is a featured post
  if (req.params.id.startsWith('featured-')) {
    return res.status(400).json({ error: 'Featured posts cannot be reported' });
  }
  
  let reporterId = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const { verifyToken } = require('../utils/auth');
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      reporterId = user.userId;
    } catch {}
  }
  const reason = req.body.reason || '';
  
  // Check if this user has already reported this post
  const existingReport = await Report.findOne({ 
    postId: req.params.id, 
    reporterId: reporterId || 'anonymous' 
  });
  
  if (existingReport) {
    return res.status(400).json({ 
      error: 'You have already reported this post',
      alreadyReported: true
    });
  }
  
  // Create the report
  await Report.create({ 
    postId: req.params.id, 
    reporterId: reporterId || 'anonymous', 
    reason 
  });
  
  // Check if this post has reached 5 reports
  const reportCount = await Report.countDocuments({ postId: req.params.id });
  
  if (reportCount >= 5) {
    // Auto-delete the post when it reaches 5 reports
    await BleedPost.findByIdAndDelete(req.params.id);
    
    // Update all reports for this post to 'actioned' status
    await Report.updateMany(
      { postId: req.params.id },
      { status: 'actioned' }
    );
    
    console.log(`Post ${req.params.id} automatically deleted due to 5+ reports`);
    
    return res.json({ 
      success: true, 
      message: 'Post reported and automatically deleted due to multiple reports',
      deleted: true
    });
  }
  
  res.json({ success: true, message: 'Reported for moderation' });
});

// Hide/unhide a post (admin/moderator only)
router.patch('/:id/hide', async (req, res) => {
  let userId = null;
  let userRole = 'user';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const { verifyToken } = require('../utils/auth');
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      userId = user.userId;
      const dbUser = await User.findById(userId);
      if (dbUser) userRole = dbUser.role;
    } catch {}
  }
  if (!['admin', 'moderator'].includes(userRole)) {
    return res.status(403).json({ error: 'Not allowed' });
  }
  const post = await BleedPost.findByIdAndUpdate(
    req.params.id,
    { hidden: !!req.body.hidden },
    { new: true }
  );
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// Prevent banned users from posting/hearting
async function isBanned(req) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const { verifyToken } = require('../utils/auth');
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      const dbUser = await User.findById(user.userId);
      if (dbUser && dbUser.banned) return true;
    } catch {}
  }
  return false;
}

// Create a new bleed post (anonymous or authenticated)
router.post('/', async (req, res) => {
  if (await isBanned(req)) return res.status(403).json({ error: 'Banned' });
  try {
    const data = bleedSchema.parse(req.body);
    let userId = null;
    // If authenticated, attach userId
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
        const { verifyToken } = require('../utils/auth');
        const token = req.headers.authorization.split(' ')[1];
        const user = verifyToken(token);
        userId = user.userId;
      } catch {}
    }
    const post = await BleedPost.create({ ...data, createdBy: userId });
    res.status(201).json(post);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Create failed' });
  }
});

// POST /bleed/prompt — get a poetic prompt from Gemini
router.post('/prompt', async (req, res) => {
  const topic = req.body.topic || '';
  let prompt = '';
  if (topic && topic.trim()) {
    prompt = `Write a poetic, emotionally evocative journal prompt about: ${topic.trim()}`;
  } else {
    prompt = `Give me a poetic, emotionally evocative journal prompt for someone struggling to express their wounds or feelings.`;
  }
  try {
    const result = await generateGeminiPrompt(prompt);
    res.json({ prompt: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

// Delete a bleed post (creator, admin, or moderator)
router.delete('/:id', async (req, res) => {
  let userId = null;
  let userRole = 'user';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const { verifyToken } = require('../utils/auth');
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      userId = user.userId;
      // Fetch user role
      const dbUser = await User.findById(userId);
      if (dbUser) userRole = dbUser.role;
    } catch {}
  }
  const post = await BleedPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  // Allow if creator, admin, or moderator
  if ((post.createdBy && userId && post.createdBy.toString() === userId) || ['admin', 'moderator'].includes(userRole)) {
    await post.deleteOne();
    return res.json({ success: true });
  }
  return res.status(403).json({ error: 'Not allowed' });
});

// Heart a post (Reddit-style, no unheart, no self-heart, no double-heart)
router.post('/:id/heart', auth, async (req, res) => {
  const userId = req.user.userId;
  
  // Check if this is a featured post
  if (req.params.id.startsWith('featured-')) {
    return res.status(400).json({ error: 'Featured posts cannot be hearted through the API' });
  }
  
  const post = await BleedPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  // Prevent self-hearting
  if (post.createdBy && post.createdBy.toString() === userId) {
    return res.status(400).json({ error: "You can't heart your own post." });
  }
  // Prevent double-hearting
  if (post.heartedBy.map(id => id.toString()).includes(userId)) {
    return res.status(400).json({ error: 'Already hearted this post' });
  }
  // Atomic update
  const updatedPost = await BleedPost.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { heartedBy: userId },
      $inc: { heartCount: 1 }
    },
    { new: true }
  );
  return res.status(200).json(updatedPost);
});

// Unheart a post (unlike)
router.delete('/:id/heart', auth, async (req, res) => {
  const userId = req.user.userId;
  
  // Check if this is a featured post
  if (req.params.id.startsWith('featured-')) {
    return res.status(400).json({ error: 'Featured posts cannot be unhearted through the API' });
  }
  
  const post = await BleedPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  // Only allow if already hearted
  if (!post.heartedBy.map(id => id.toString()).includes(userId)) {
    return res.status(400).json({ error: 'You have not hearted this post' });
  }
  // Atomic update
  const updatedPost = await BleedPost.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { heartedBy: userId },
      $inc: { heartCount: -1 }
    },
    { new: true }
  );
  return res.status(200).json(updatedPost);
});

// Reports management endpoints (admin/moderator only)
router.get('/reports', async (req, res) => {
  let userId = null;
  let userRole = 'user';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const { verifyToken } = require('../utils/auth');
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      userId = user.userId;
      const dbUser = await User.findById(userId);
      if (dbUser) userRole = dbUser.role;
    } catch {}
  }
  if (!['admin', 'moderator'].includes(userRole)) {
    return res.status(403).json({ error: 'Not allowed' });
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const reports = await Report.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('postId reporterId');
  const total = await Report.countDocuments();
  res.json({ reports, total, page, pages: Math.ceil(total / limit) });
});

router.patch('/reports/:id', async (req, res) => {
  let userId = null;
  let userRole = 'user';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const { verifyToken } = require('../utils/auth');
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      userId = user.userId;
      const dbUser = await User.findById(userId);
      if (dbUser) userRole = dbUser.role;
    } catch {}
  }
  if (!['admin', 'moderator'].includes(userRole)) {
    return res.status(403).json({ error: 'Not allowed' });
  }
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!report) return res.status(404).json({ error: 'Not found' });
  res.json(report);
});

module.exports = router; 