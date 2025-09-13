require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiting (bonus)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Try again later.' }
});
app.use(limiter);

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

const MONGO = process.env.MONGO_URI || 'mongodb://mongo:27017/ai-support';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });
