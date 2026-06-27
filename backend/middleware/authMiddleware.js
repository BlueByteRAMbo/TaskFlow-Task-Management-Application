const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Access Denied. No Token Provided"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"User Not Found. Invalid Token"
            });
        }

        next();
    } catch(error){
        let message = 'Invalid Token';
        if (error.name === 'TokenExpiredError'){
            message = 'Token Expired. Please Login Again';
        }
        return res.status(401).json({success:false, message});
    }

}

module.exports = { protect };