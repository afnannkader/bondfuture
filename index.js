const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors({ 
  origin: '*', // Replace with your frontend domain
  methods: ['GET', 'POST'],
  credentials: true
}));
// Middleware to parse JSON data
app.use(bodyParser.json()); // Use json() to parse JSON data

// Serve static files from the 'public' directory
app.use(express.static('public'));


// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: 'bondnewsletteronline@gmail.com', // Your email
    pass: 'sppc cxhd kqld igqi', // Your email password or app password
  },
});


app.get('/', (req, res) => {
  res.send('Welcome to Bond Future API!');
});
// Route to handle form submission
app.post('/subscribe', (req, res) => {
  const userEmail = req.body.email;
  const source = req.body.source;

  if (!userEmail) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const mailOptions = {
    from: 'bondnewsletteronline@gmail.com', // Sender address
    to: 'bondnewsletteronline@gmail.com',   // Receiver address
    subject: `New Subscription from ${source}`,
    text: `${userEmail} has subscribed to receive updates.`, // Email content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'There was an error processing your request.' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Thank you for subscribing! We will keep you updated.' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
