// storage.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: specify the folder in Cloudinary
    allowedFormats: ['jpeg', 'png', 'jpg', 'gif'], // Allowed formats for upload
  },
});

module.exports = storage;