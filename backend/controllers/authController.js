const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId,email) => {
    return jwt.sign(
        { id: userId, email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

//API EndPoint 1 POST /api/auth/register
const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if( !name || !email || !password ){
            return res.status(400).json({
                success:false,
                message: "Please provide name, email and password"
            });
        }

        if( password.length < 6){
            return res.status(400).json({
                success:false,
                message:'password must be atleast 6 characters',
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase()});

        if (existingUser){
            return res.status(400).json({
                success:false,
                message: 'An account with this email already exists'
            });
        }

        const user = await User.create({name, email, password});
        //User CReated now generating JWT
        const token = generateToken(user._id,user.email);

        res.status(201).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    }catch(error){
        if (error.code===11000){
            return res.status(400).json({ success: false, message: 'Email already in use'});
        }
        console.error('Registration Error: ', error);
        res.status(500).json({ success: false, message: 'Server Error During Registration'});
    }
};

//API EndPoint 2 POST /api/auth/login
const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide Valid email and password'
            });
        }

        const user = await User.findOne({email: email.toLowerCase()}).select('+password');

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user._id, user.email);
        res.json({    
            success: true,    
            token,    
            user: { _id: user._id, name: user.name, email: user.email }    
        });
    } catch(error){
        console.error('Login Error: ',error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login' 
        });    
    }
};

module.exports = {register, login};