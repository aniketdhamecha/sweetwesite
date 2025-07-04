const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model
const router = express.Router();
const bcryptjs = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const jwtSecret = 'MYNAMEISVISHALLUHAR'; // Replace with your actual secret key
const {body , validationResult} = require('express-validator'); // Import express-validator for validation
// Import express-validator for validation
// Middleware to parse JSON

router.post('/loginuser',
    [
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
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }
        const pwdCompare = await bcryptjs.compare(req.body.password, userData.password);
        if(!pwdCompare) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }
        const data = {
            user: {
                id: userData.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error);
        res.json({success : false});
    }
});

module.exports = router;