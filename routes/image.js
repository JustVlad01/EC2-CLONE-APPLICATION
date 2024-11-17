const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/ImageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer(); // Initializes multer for parsing multipart form data

// Route to handle image upload
router.post('/upload', authMiddleware("UploadImage"), upload.single('image'), uploadImage);

module.exports = router;
