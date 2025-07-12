const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Generate a poetic prompt or response using Gemini API
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The generated text
 */
async function generateGeminiPrompt(prompt) {
  if (!GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY');
  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    // Gemini returns text in a nested structure
    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || '';
  } catch (err) {
    console.error('Gemini API error:', err?.response?.data || err.message);
    throw new Error('Gemini API request failed');
  }
}

module.exports = { generateGeminiPrompt }; 