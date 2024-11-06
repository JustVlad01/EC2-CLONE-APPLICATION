const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
require('dotenv').config();

if (!process.env.AWS_BUCKET_NAME) {
    throw new Error('AWS_BUCKET_NAME is not set in environment variables.');
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function uploadImageToS3(fileBuffer, key) {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
    };

    try {
        const upload = new Upload({
            client: s3Client,
            params: uploadParams,
        });

        const result = await upload.done();
        return result;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}

module.exports = { uploadImageToS3 };