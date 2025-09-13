const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['user','assistant','system'], default: 'user' },
  text: { type: String, required: true },
  meta: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
