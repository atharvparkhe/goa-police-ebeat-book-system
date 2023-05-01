const SubDivison = require('../models/Subdivison');
const Station = require('../models/Station')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors')
const {checkIfWithinBoundary,checkdistict} = require('../helpers/myFuctions')
  
  
const createSubdivision = async(req,res)=>{
    const {role} = req.user;
    
    const {coords} = req.body

    if(!coords)
        throw new BadRequestError('coords were not provided')
    if(role != 'sp')
        throw new UnauthenticatedError('You should be sp to create subdivision')
    
    const result = checkIfWithinBoundary(coords)
    if(result){
        const district = checkdistict(coords)
        req.body.district = district
        const subdivision = await SubDivison.create(req.body)
        res.status(StatusCodes.OK).json({msg:"Subdivision created"})
    }    
    else
        res.status(StatusCodes.BAD_REQUEST).json({msg:"You do not have access to specified coordinates"})
}

const updateSubdivision = async(req,res)=>{
    const {id} = req.params
    const {role} = req.user;
    if(role != 'sp')
        throw new UnauthenticatedError('You should be sp to update subdivision')

    const subdivion = await SubDivison.findByIdAndUpdate(id,{$set: req.body},{new:true,runValidators:true})
    if(!subdivion)
        throw new NotFoundError(`No subdivion with id:${id}`);
    
        res.status(StatusCodes.OK).json({subdivion})
}

const deleteSubdivision = async(req,res)=>{
    const {id} = req.params
    const {role} = req.user;
    if(role != 'sp')
        throw new UnauthenticatedError('You should be sp to delete subdivision')

    const subdivision = await SubDivison.find({_id:id});
    if(subdivision.length == 0 )
        throw new NotFoundError(`No subdivision with id:${id}`);

    const {stations} = subdivision[0]
    stations.map(async(station_id)=>{
        await Station.findByIdAndDelete(station_id)
    })
    await SubDivison.findByIdAndDelete(id)
    
    res.status(StatusCodes.OK).json({"message":`${id} subdivision deleted`})
}

const getAllSubDivisions = async(req,res)=>{
    const {role,userId} = req.user;
    if(role == 'sp' || role == 'dysp'){
        if(role == 'sp'){
            const subdivisions = await SubDivison.find().sort('createdAt');
            res.status(StatusCodes.OK).json({subdivisions})
        }
        else{
            const user = await User.find({_id:userId})
            const {district} = user[0]
            if(district == 'north'){
                const subdivisions = await SubDivison.find({district:'north'})
                res.status(StatusCodes.OK).json({subdivisions})
            }
            else{
                const subdivisions = await SubDivison.find({district:'south'})
                res.status(StatusCodes.OK).json({subdivisions})
            }
        }
    }
    else
        throw new UnauthenticatedError('You should be sp to view all subdivisions')
   
}

const getSubDivision = async(req,res)=>{
    const {role} = req.user;
    const {id} = req.params
    if(role != 'sp' && role != 'dysp')
        throw new UnauthenticatedError('You should be sp or dysp to view subdivision')
    
    let subdivision = await SubDivison.find({_id:id});
    let stations = []
    
    if(subdivision.length == 0)
            throw new BadRequestError('Invalid id')

    const temp = subdivision[0]

    if(temp.stations.length == 0)
        res.status(StatusCodes.OK).json({subdivision:subdivision[0]})
    else{
        for(let i=0;i<temp.stations.length;i++){
            const station_id = temp.stations[i]
            const station = await Station.findById(station_id)
            stations.push(station)
            if(i == temp.stations.length - 1){
                subdivision[0].stations = stations
                res.status(StatusCodes.OK).json({subdivision:subdivision[0]})
            }
        }
    }
    //res.status(StatusCodes.OK).json({subdivision:subdivision[0]})
}

module.exports = {createSubdivision,updateSubdivision,deleteSubdivision,
    getAllSubDivisions,getSubDivision}