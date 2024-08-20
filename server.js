const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { User, Contact } = require('./models'); // Import the models
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ORIGIN, // Frontend URL
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  }
});

// Route to handle Get Involved form submission
app.post('/api/submit-getInvolved', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    // Send email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'anaushad246@gmail.com',
      subject: 'New Form Submission',
      text: `New User: ${JSON.stringify(newUser, null, 2)}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error while sending email');
      } else {
        res.send('Form submitted successfully and email sent to admin');
      }
    });
  } catch (error) {
    res.status(500).send('Error submitting form');
  }
});

// Route to handle Contact Us form submission
app.post('/api/submit-contactUs', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    // Send email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'anaushad246@gmail.com',
      subject: 'New Form Submission',
      text: `New Contact: ${JSON.stringify(newContact, null, 2)}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error while sending email');
      } else {
        // Send success response with custom message
        res.send('Form submitted successfully and email sent to admin');
      }
    });
  } catch (error) {
    res.status(500).send('Error submitting form');
  }
});



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
