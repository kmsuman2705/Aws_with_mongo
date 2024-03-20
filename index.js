const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Create User model
const User = mongoose.model('User', UserSchema);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail address
        pass: 'your-email-password' // Replace with your Gmail password
    }
});

// Function to send email
function sendEmail(username, email, password) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Registration Successful',
        html: `<h1>Congratulations, ${username}!</h1>
                <p>You have successfully registered.</p>
                <p>Here are your registration details:</p>
                <ul>
                    <li><strong>Username:</strong> ${username}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

// Route to serve signup form
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to handle sign-up form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    // Create new user
    const newUser = new User({ username, email, password });
    // Save user to database
    newUser.save()
        .then(user => {
            console.log('User signed up successfully:', user);
            res.status(201).send('User signed up successfully');
            // Send email notification to the user
            sendEmail(username, email, password);
        })
        .catch(err => {
            console.error('Error signing up:', err);
            res.status(500).send('Error signing up');
        });
});

// Route to serve login form
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Find user by username and password
    User.findOne({ username, password }).exec()
        .then(user => {
            if (!user) {
                // User not found, send error response
                res.status(404).send('Invalid username or password');
            } else {
                // User found, send success response
                res.status(200).send('Login successful');
            }
        })
        .catch(err => {
            // Error occurred, send error response
            console.error('Error logging in:', err);
            res.status(500).send('Error logging in');
        });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
