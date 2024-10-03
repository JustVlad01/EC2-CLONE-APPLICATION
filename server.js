const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
//CORS settings
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config(); // For environment variables

// Load models
const Hotel = require('./models/restaurant');
const HotelSettings = require('./models/hotelSettings');
// Load other models similarly...

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

app.listen(3000, () => console.log('Server running on port 3000'));
