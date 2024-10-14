const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
};

exports.signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '100d'});
        res.json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};