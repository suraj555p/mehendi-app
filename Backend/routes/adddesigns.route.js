const express = require('express');
const upload = require('../middlewares/multer.middleware.js'); // Import the multer middleware
const {
    createDesign,
    getAllDesigns,
    getDesignById,
    updateDesign,
    deleteDesign,
} = require('../controllers/adddesigns.controller.js');

const router = express.Router();

// Define routes for CRUD operations
// Use upload.array('images', 3) to handle multiple image uploads for createDesign
router.post('/', upload.fields([
    { name: 'coverImage', maxCount: 1 }, // Cover image
    { name: 'designImage1', maxCount: 1 }, // First design image
    { name: 'designImage2', maxCount: 1 }, // Second design image
    { name: 'designImage3', maxCount: 1 }  // Third design image
]), createDesign); // Create a new design with multiple image uploads

router.get('/', getAllDesigns); // Get all designs
router.get('/:id', getDesignById); // Get a single design by ID
router.put('/:id', updateDesign); // Update a design by ID
router.delete('/:id', deleteDesign); // Delete a design by ID

module.exports = router;