const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors');
const Station = require('../models/Station');
const Beat = require('../models/Beat');

const getAllPI = async(req,res)=>{
    const {role,userId} = req.user;
    
    if(role == 'sp' && role == 'dysp')
        throw new UnauthenticatedError('You should be sp/dysp to get all PIs')
   
    const officers = await User.find({role:'pi'})
    res.status(StatusCodes.OK).json({officers})
}
const getAllConstable = async(req,res)=>{
    const {role,userId} = req.user;
    
    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to get all beat constables')
   
    const constables = await User.find({role:'beat'})
    res.status(StatusCodes.OK).json({constables})
}
const getStationPI = async(req,res)=>{
    const {role} = req.user;
    const {id} = req.params;
    
    if(role == 'sp' && role == 'dysp')
        throw new UnauthenticatedError('You should be sp/dysp to get Station PI')
    
    const station = await Station.findById(id)
    if(!station)
        throw new BadRequestError('Invalid station id')

    const pi = await User.findById(station.pi)
    res.status(StatusCodes.OK).json({pi})
}
const getBeatConstable = async(req,res)=>{
    const {role} = req.user;
    const {id} = req.params;
    
    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to get Beat Constable')
    
    const beat = await Beat.findById(id)
    if(!beat)
        throw new BadRequestError('Invalid beat id')

    const constable = await User.findById(beat.constable)
    res.status(StatusCodes.OK).json({constable})
}

const getPersonnel = async(req,res)=>{
    const {role} = req.user;
    const {id} = req.params;
    const temp = await User.findById(id)
    if(!temp)
        throw new BadRequestError('Invalid personnel id')
        
    let personnel = temp
    delete personnel.password
    res.status(StatusCodes.OK).json({personnel})
}
module.exports = {getAllPI,getAllConstable,getStationPI,getPersonnel,getBeatConstable}


