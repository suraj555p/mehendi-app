// imageUploadMiddleware.js
const multer = require('multer');
const storage = require('../storage.js');

const upload = multer({ storage: storage });

module.exports = upload;