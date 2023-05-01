const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

async function authenticationMiddleware(req,res,next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
        throw new UnauthenticatedError("No Token provided");
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const {userId,role,email} = payload;  // destructuring payload data
        req.user = {userId,role,email}; // passing to req.user as this midddleware will pass control to controller function
    }catch(err){
        throw new UnauthenticatedError("Not allowed to access this route")
    }
    next();
}
module.exports = authenticationMiddleware;