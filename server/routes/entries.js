const express = require('express');
const router = express.Router();
const { z } = require('zod');
const Entry = require('../models/Entry');
const auth = require('../middleware/auth');

// Zod schema for entry
const entrySchema = z.object({
  title: z.string().optional(),
  content: z.string(),
  emotionTags: z.array(z.string()).optional(),
  isEncrypted: z.boolean().optional(),
  encryptedData: z.string().optional(),
});

// Get all entries for user
router.get('/', auth, async (req, res) => {
  const entries = await Entry.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json(entries);
});

// Get single entry
router.get('/:id', auth, async (req, res) => {
  const entry = await Entry.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!entry) return res.status(404).json({ error: 'Not found' });
  res.json(entry);
});

// Create entry
router.post('/', auth, async (req, res) => {
  try {
    const data = entrySchema.parse(req.body);
    const entry = await Entry.create({ ...data, userId: req.user.userId });
    res.status(201).json(entry);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Create failed' });
  }
});

// Update entry
router.put('/:id', auth, async (req, res) => {
  try {
    const data = entrySchema.parse(req.body);
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete entry
router.delete('/:id', auth, async (req, res) => {
  const entry = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!entry) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router; 