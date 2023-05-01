const Beat = require('../models/Beat')
const Station = require('../models/Station');
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors')
const {checkIfWithinSubDivision} = require('../helpers/myFuctions')


const assignBeatOfficer = async(req,res)=>{
    const {id} = req.params
    const {role,userId} = req.user;
    const {constable} = req.body

    if(!constable)
        throw new BadRequestError("'constable' field (id) was not provided")
    
    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to assign beat officer')
    
    const user = await User.findByIdAndUpdate(constable,{$push:{assigned:id}},{new:true,runValidators:true})
    if(!user)
        throw new BadRequestError(`No Constable with id: ${pi}`)
    
    const beat = await Beat.find({_id:id});
    if(beat.length == 0)
        throw new NotFoundError(`No beat with id:${id}`);

    if(role == 'pi'){
        const {station_id} = beat[0];
        const station = await Station.find({_id:station_id});
        const {pi} = station[0]
        if(userId != pi)
            throw new UnauthenticatedError('PI can edit beats which are under his jurisdiction only')  
    }
    
    await Beat.findByIdAndUpdate(id,{$set:{constable:constable}})
    res.status(StatusCodes.OK).json({msg:"Beat Officer Assigned"})
}

const addBeat = async(req,res)=>{
    const {role,userId} = req.user;
    const {station_id} = req.body

    if(!station_id)
        throw new BadRequestError("Station id 'station_id' was not provided")

    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to add a beat')
    
    const station = await Station.find({_id:station_id});
    if(station.length === 0)
        throw new NotFoundError(`${station_id} station does not exist`)
    
    if(role == 'pi'){
        const {pi} = station[0]
        if(userId != pi)
            throw new UnauthenticatedError('PI can add beat only in areas under his jurisdiction')  
    }
    
    const {coords:boundary} = station[0]
    const {coords} = req.body

    const result = checkIfWithinSubDivision(boundary,coords)
    if(result){
        const beat = await Beat.create(req.body)
        await Station.findByIdAndUpdate(station_id,{$push:{beats:beat._id}})
        res.status(StatusCodes.OK).json({msg:"Beat Added"})
    }    
    else
        res.status(StatusCodes.BAD_REQUEST).json({msg:"You cannot assign coordinates outside of specified station"})
}

const updateBeat = async(req,res)=>{
    const {id} = req.params
    const {role,userId} = req.user;

    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to update beat')

    const beat = await Beat.find({_id:id});
    if(beat.length == 0)
        throw new NotFoundError(`No beat with id:${id}`);

    const {station_id} = beat[0];
    const station = await Station.find({_id:station_id});
    if(role == 'pi'){
        const {pi} = station[0]
        if(userId != pi)
            throw new UnauthenticatedError('PI can edit beats which are under his jurisdiction only')  
    }
    await Beat.findByIdAndUpdate(id,{$set: req.body},{runValidators:true})
    res.status(StatusCodes.OK).json({msg:'Beat updated'})
}

const deleteBeat = async(req,res)=>{
    const {id} = req.params
    const {role} = req.user;

    if(role != 'sp' && role != 'dysp' && role != 'pi')
        throw new UnauthenticatedError('You should be sp/dysp/pi to delete beat')
    
    const beat = await Beat.find({_id:id});
    if(beat.length == 0)
        throw new NotFoundError(`No beat with id:${id}`);

    const {station_id} = beat[0];
    const station = await Station.find({_id:station_id});

    const {beats} = station[0]
    const result = beats.filter((beat_id)=>beat_id != id)
    req.body.beats = result
    
    await Station.findByIdAndUpdate(station_id,{$set: req.body},{runValidators:true})
    await Beat.findByIdAndDelete(id)
    
    res.status(StatusCodes.OK).json({"message":`${id} station deleted`})
}

const getBeat = async(req,res)=>{
    const {role,userId} = req.user;
    const {id} = req.params
    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to get beat info')
    const beat = await Beat.findById(id)
    if(role == 'pi'){
        const station = await Station.findById(beat.station_id)
        if(station.pi != userId)
            throw new UnauthenticatedError('PI can only view beats from his own station')
    }
    res.status(StatusCodes.OK).json({beat})
}

const allBeats = async(req,res)=>{
    const {role,userId} = req.user;
    if(role == 'sp'){
        const beats = await Beat.find({})
        res.status(StatusCodes.OK).json({beats})
    }
    else if(role == 'pi'){
        const station = await Station.find({pi:userId})
        if(station.length == 0)
            throw new BadRequestError('PI not assigned to any station')
        let beats = []
        const temp = station[0]
        for(let i=0;i<temp.beats.length;i++){
            const beat_id = temp.beats[i]
            const beat = await Beat.findById(beat_id)
            beats.push(beat)
            if(i == station[0].beats.length - 1)
                res.status(StatusCodes.OK).json({beats})
        }
    }
    else
        throw new UnauthenticatedError('You must be sp/pi to get all beats')
}

module.exports = {addBeat,getBeat,updateBeat,deleteBeat,assignBeatOfficer,allBeats}