const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  issueCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true
  },
  responseText: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['billing', 'technical', 'account', 'security', 'notification'],
    lowercase: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Entry', EntrySchema)