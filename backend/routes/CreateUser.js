const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model
const router = express.Router();
const bcryptjs = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const {body , validationResult} = require('express-validator'); // Import express-validator for validation
// Import express-validator for validation
// Middleware to parse JSON

router.post('/createuser',
    [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('location').notEmpty().withMessage('Location is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ]
    ,async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    const salt = await bcryptjs.genSalt(10); // Generate a salt for hashing
    let secPassword = await bcryptjs.hash(req.body.password, salt); // Hash the password
    try {
        await User.create({  // ✅ Fixed 'User' instead of 'user'
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword // Use the hashed password
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            success: false,
            error: 'Internal server error'
        });    
    }
});


module.exports = router;
