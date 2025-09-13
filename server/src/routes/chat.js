const express = require('express');
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const { queryOpenRouter } = require('../services/ai');

const router = express.Router();

// send a message (protected)
router.post('/send', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Message required' });

    // Save user message
    const userMsg = new Message({ user: req.user._id, role: 'user', text });
    await userMsg.save();

    // Query AI
    const aiText = await queryOpenRouter(text);

    // Save assistant message
    const assistantMsg = new Message({ user: req.user._id, role: 'assistant', text: aiText });
    await assistantMsg.save();

    res.json({ assistant: assistantMsg, user: userMsg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error processing chat' });
  }
});

// get chat history for logged in user
router.get('/history', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort({ createdAt: 1 }).lean();
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
