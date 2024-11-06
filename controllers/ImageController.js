const { uploadImageToS3 } = require('../config/s3');
const { Upload } = require('@aws-sdk/lib-storage');
const path = require('path');
require('dotenv').config();

const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        const restaurantId = req.user.restaurantId; // Assume you get the restaurantId from `req.user`

        // Construct the file key for S3
        const fileKey = `restaurants/${restaurantId}/images/${Date.now()}_${file.originalname}`;

        // Upload image to S3
        const result = await uploadImageToS3(file.buffer, fileKey);

        // Construct the public URL
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

module.exports = { uploadImage };