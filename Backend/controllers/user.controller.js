const User = require('../models/User.model.js'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    console.log(req.body);
    

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("duploicate");
            
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Send success response
        res.status(201).json({ message: "Registration is completed!!!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login user
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     console.log(req.body);
    

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password.' });
//         }

//         console.log(user);
        

//         // Check password
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password.' });
//         }

//         console.log("Password is correct");
        

//         // Generate a token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ message: "Login is completed!!!" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// };

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log("data", req.body);
    
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' , "success": false });
        }

        console.log(user);
        
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.', "success": false });
        }

        console.log("Password is correct");
        
        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send back the token with a 200 status
        res.status(200).json({ "token":token, "success":true }); // Include the token in the response

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
