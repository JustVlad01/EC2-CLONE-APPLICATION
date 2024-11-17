const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const invitationRoutes = require('./routes/invitation');

dotenv.config();

const app = express();
const allowedOrigins = [process.env.ADMIN_FRONTEND_URL, process.env.CLIENT_FRONTEND_URL];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config();


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
