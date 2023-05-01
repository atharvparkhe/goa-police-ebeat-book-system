const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { UnauthenticatedError } = require('../errors');

const register = async(req,res)=>{
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({role:user.getRole(),token});
    
}
const login = async(req,res)=>{
    const {email,password} = req.body;
    
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const passCorrect = await user.comparePassword(password);
    if(!passCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({role:user.getRole(),token});
}
const load = async(req,res)=>{
    const {userId} = req.user
    const user = await User.findById(userId)
    const {_id,email,role} = user
    if(!user){
        throw new UnauthenticatedError('Invalid Token')
    }
    res.status(StatusCodes.OK).json({"user":{_id,email,role}});
}

module.exports = {register,login,load};