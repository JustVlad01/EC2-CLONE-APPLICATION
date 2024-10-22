const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const invitationRoutes = require('./routes/invitation');

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config(); // For environment variables


// Load models
const Invitation = require('./models/invitation');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hotelOrderingSystem')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('connection error:', err));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Backend API routes
app.use('/api', require('./routes/apiRoutes'));

// Invitation routes
app.use('/invitation', invitationRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
