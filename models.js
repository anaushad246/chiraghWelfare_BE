const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  fatherName: {
    type: String,
    lowercase: true,
  },
  mobile: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  DOB: {
    type: Date,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
});

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
}, {
  timestamps: true,
});

// Visitor Schema
const VisitorSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
});

// Exporting the models
module.exports = {
  User: mongoose.model('User', UserSchema),
  Contact: mongoose.model('Contact', ContactSchema),
  Visitor: mongoose.model('Visitor', VisitorSchema) // Fixed typo here
};
