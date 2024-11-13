const Design = require('../models/adddesigns.model');

// Create a new design
const createDesign = async (req, res) => {
  try {
    const { designName, description, price, bookingCharge } = req.body;

    // Retrieve uploaded image URLs from req.files
    // const coverImageUrl = req.files['coverImage'] ? req.files['coverImage'][0].path : null; 
    const designImage1Url = req.files['designImage1'] ? req.files['designImage1'][0].path : null; 
    const designImage2Url = req.files['designImage2'] ? req.files['designImage2'][0].path : null; 
    const designImage3Url = req.files['designImage3'] ? req.files['designImage3'][0].path : null; 

    console.log(coverImageUrl);
    
    // Create a new design instance
    const newDesign = new Design({
      designName,
      description,
      price,
      bookingCharge,
      designImage1: designImage1Url,
      designImage2: designImage2Url,
      designImage3: designImage3Url,
    });

    // Save the design to the database
    await newDesign.save();
    
    return res.status(201).json({ message: 'Design created successfully!', design: newDesign });
  } catch (error) {
    console.error('Error creating design:', error);
    return res.status(500).json({ error: 'Failed to create design.' });
  }
};

// Get all designs
const getAllDesigns = async (req, res) => {
  try {
    const designs = await Design.find();
    return res.status(200).json(designs);
  } catch (error) {
    console.error('Error fetching designs:', error);
    return res.status(500).json({ error: 'Failed to fetch designs.' });
  }
};

// Get a single design by ID
const getDesignById = async (req, res) => {
  const { id } = req.params;

  try {
    const design = await Design.findById(id);
    
    if (!design) {
      return res.status(404).json({ error: 'Design not found.' });
    }

    return res.status(200).json(design);
  } catch (error) {
    console.error('Error fetching design:', error);
    return res.status(500).json({ error: 'Failed to fetch design.' });
  }
};

// Update a design by ID
const updateDesign = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDesign = await Design.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDesign) {
      return res.status(404).json({ error: 'Design not found.' });
    }

    // If images are being updated, you may want to handle them here as well
    if (req.files) {
      updatedDesign.coverImage = req.files['coverImage'] ? req.files['coverImage'][0].path : updatedDesign.coverImage;
      updatedDesign.designImage1 = req.files['designImage1'] ? req.files['designImage1'][0].path : updatedDesign.designImage1;
      updatedDesign.designImage2 = req.files['designImage2'] ? req.files['designImage2'][0].path : updatedDesign.designImage2;
      updatedDesign.designImage3 = req.files['designImage3'] ? req.files['designImage3'][0].path : updatedDesign.designImage3;
      
      await updatedDesign.save(); // Save changes if images were updated
    }

    return res.status(200).json({ message: 'Design updated successfully!', design: updatedDesign });
  } catch (error) {
    console.error('Error updating design:', error);
    return res.status(500).json({ error: 'Failed to update design.' });
  }
};

// Delete a design by ID
const deleteDesign = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDesign = await Design.findByIdAndDelete(id);

    if (!deletedDesign) {
      return res.status(404).json({ error: 'Design not found.' });
    }

    return res.status(200).json({ message: 'Design deleted successfully!' });
  } catch (error) {
    console.error('Error deleting design:', error);
    return res.status(500).json({ error: 'Failed to delete design.' });
  }
};

module.exports = {
  createDesign,
  getAllDesigns,
  getDesignById,
  updateDesign,
  deleteDesign,
};