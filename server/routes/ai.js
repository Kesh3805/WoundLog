const express = require('express');
const router = express.Router();
const { z } = require('zod');
// const { Configuration, OpenAIApi } = require('openai'); // Uncomment for real integration

// Zod schema
const aiSchema = z.object({
  prompt: z.string().min(1),
});

// POST /ai/respond
router.post('/respond', async (req, res) => {
  try {
    const { prompt } = aiSchema.parse(req.body);
    // TODO: Integrate with OpenAI
    // const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    // const completion = await openai.createChatCompletion({ ... });
    // return res.json({ response: completion.data.choices[0].message.content });
    res.json({ response: `AI (stub): You said: ${prompt}` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'AI failed' });
  }
});

module.exports = router; 