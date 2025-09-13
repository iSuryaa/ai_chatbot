const axios = require('axios');

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'; // check docs if changed

async function queryOpenRouter(userMessage, opts = {}) {
  // Build messages array; you can keep more context if desired (we'll just send last message)
  const payload = {
    model: opts.model || process.env.OPENROUTER_MODEL || 'gpt-3.5-mini', // change as available
    messages: [
      { role: 'user', content: userMessage }
    ],
    max_tokens: opts.maxTokens || 512,
    temperature: opts.temperature ?? 0.2
  };

  const resp = await axios.post(OPENROUTER_URL, payload, {
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  // Response shape may differ; this maps common fields
  const assistantText = resp.data?.choices?.[0]?.message?.content || resp.data?.choices?.[0]?.text || '';
  return assistantText;
}

module.exports = { queryOpenRouter };
