const User = require('../models/User');
const Station = require('../models/Station');
const SubDivison = require('../models/Subdivison')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors')
const {checkIfWithinSubDivision} = require('../helpers/myFuctions');
const Beat = require('../models/Beat');

const getStation = async(req,res)=>{
    const {id} = req.params
    const {role,userId} = req.user;
    if(role == 'beat')
        throw new UnauthenticatedError('Beat officer cannot access station details')
    
    let station = await Station.find({_id:id});

    if(station.length == 0)
        throw new BadRequestError(`No station with id :${id}`)

    const {pi} = station[0]
    if(role == 'pi'){
        if(pi == userId){
            let beats = []
            const temp = station[0]

            if(temp.beats.length == 0)
                res.status(StatusCodes.OK).json({station:station[0]})
            else{
                for(let i=0;i<temp.beats.length;i++){
                    const beat_id = temp.beats[i]
                    const beat = await Beat.findById(beat_id)
                    beats.push(beat)
                    if(i == temp.beats.length - 1){
                        station[0].beats = beats
                        res.status(StatusCodes.OK).json({station:station[0]})
                    }
                }
            }
        }
        else
            throw new UnauthenticatedError('PI can only access the station he is assigned')
    }
    else{
        let beats = []
        const temp = station[0]

        if(temp.beats.length == 0)
            res.status(StatusCodes.OK).json({station:station[0]})
        else{
            for(let i=0;i<temp.beats.length;i++){
                const beat_id = temp.beats[i]
                const beat = await Beat.findById(beat_id)
                beats.push(beat)
                if(i == temp.beats.length - 1){
                    station[0].beats = beats
                    res.status(StatusCodes.OK).json({station:station[0]})
                }
            }
        }
    }
}

const assignInspector = async(req,res)=>{
    const {id} = req.params
    const {role} = req.user;
    const {pi} = req.body

    if(!pi)
        throw new BadRequestError("'pi' field was not provided")

    if(role != 'sp' && role != 'dysp')
        throw new UnauthenticatedError('You should be sp/dysp to assign inspector to station')
    
    const user = await User.findByIdAndUpdate(pi,{$push:{assigned:id}},{new:true,runValidators:true})
    if(!user)
        throw new BadRequestError(`No PI with id: ${pi}`)
    
    await Station.findByIdAndUpdate(id,{$set:{pi:pi}})
    res.status(StatusCodes.OK).json({msg:"PI assigned"})
}

const addStation = async(req,res)=>{
    const {role} = req.user;
    const {sub_id} = req.body

    if(!sub_id)
        throw new BadRequestError("Subdivision id 'sub_id' was not provided")

    if(role != 'sp' && role != 'dysp')
        throw new UnauthenticatedError('You should be sp/dysp to add a station')
    
    const subdivision = await SubDivison.find({_id:sub_id});
    if(subdivision.length === 0)
        throw new NotFoundError(`${sub_id} subdivision does not exist`)
    
    const {coords:boundary} = subdivision[0]
    const {coords} = req.body

    const result = checkIfWithinSubDivision(boundary,coords)
    if(result){
        const station = await Station.create(req.body)
        await SubDivison.findByIdAndUpdate(sub_id,{$push:{stations:station._id}})
        res.status(StatusCodes.OK).json({msg:"Station Added"})
    }    
    else
        res.status(StatusCodes.BAD_REQUEST).json({msg:"You cannot assign coordinates outside of specified subdivision"})
}

const updateStation = async(req,res)=>{
    const {id} = req.params
    const {role} = req.user;

    if(role != 'sp' && role != 'dysp')
        throw new UnauthenticatedError('You should be sp/dysp to update station details')

    const station = await Station.findByIdAndUpdate(id,{$set: req.body},{new:true,runValidators:true})
    if(!station)
        throw new NotFoundError(`No station with id:${id}`);
    
    res.status(StatusCodes.OK).json({station})
}

const deleteStation = async(req,res)=>{
    const {id} = req.params
    const {role} = req.user;
    if(role != 'sp' && role != 'dysp')
        throw new UnauthenticatedError('You should be sp/dysp to delete station')

    const station = await Station.find({_id:id});
    if(station.length == 0)
        throw new NotFoundError(`No station with id:${id}`);
    
    const {sub_id} = station[0]

    const subdivision = await SubDivison.find({_id:sub_id});
    const {stations} = subdivision[0]
    const result = stations.filter((station_id)=>station_id != id)
    req.body.stations = result
    
    await SubDivison.findByIdAndUpdate(sub_id,{$set: req.body},{runValidators:true})
    await Station.findByIdAndDelete(id)
    
    res.status(StatusCodes.OK).json({"message":`${id} station deleted`})
}

const getStations = async(req,res)=>{
    const {role,userId} = req.user;
    if(role == 'beat')
        throw new UnauthenticatedError('You should be sp/dysp/pi to get station details')
    
    else if(role == 'pi'){
        const stations = await Station.find({pi:userId});
        if(stations.length == 0)
            throw new NotFoundError(`PI ${userId} not assigned to any station`)
        else
            res.status(StatusCodes.OK).json({stations})
    }
    else{
        if(role == 'dysp'){
            const user = await User.find({_id:userId})
            const {district} = user[0]
            if(district == 'north'){
                const subdivisions = await SubDivison.find({district:'north'})
                let stations = []
                if(subdivisions.length == 0)
                    res.status(StatusCodes.OK).json({stations})
                else{
                    for(let i=0;i<subdivisions.length;i++){
                        const temp = subdivisions[i].stations
                        if(temp.length == 0 && i == subdivisions.length - 1)
                            res.status(StatusCodes.OK).json({stations})
                        
                        if(temp.length == 0)
                            continue
                            
                        for(let j=0;j<temp.length;j++){
                            const station = await Station.findById(temp[j])
                            stations.push(station)
                            if(j == temp.length - 1 && i == subdivisions.length - 1)
                                res.status(StatusCodes.OK).json({stations})
                        }
                    }
                }
            }
            else{
                const subdivisions = await SubDivison.find({district:'south'})
                let stations = []
                if(subdivisions.length == 0)
                    res.status(StatusCodes.OK).json({stations})
                else{
                    for(let i=0;i<subdivisions.length;i++){
                        const temp = subdivisions[i].stations
                        if(temp.length == 0 && i == subdivisions.length - 1)
                            res.status(StatusCodes.OK).json({stations})
                        
                        if(temp.length == 0)
                            continue

                        for(let j=0;j<temp.length;j++){
                            const station = await Station.findById(temp[j])
                            stations.push(station)
                            if(j == temp.length - 1 && i == subdivisions.length - 1)
                                res.status(StatusCodes.OK).json({stations})
                        }
                    }
                }
            }
        }else{
            const stations = await Station.find({})
            res.status(StatusCodes.OK).json({stations})
        }
    }
    
}
const getMyStation = async(req,res)=>{
    console.log('test')
    const {role,userId} = req.user
    if(role != 'pi')
        throw new BadRequestError('This endpoint is only for pi')
    let station = await Station.find({pi:userId})
    const temp = station[0]
    let beats = []

    if(temp.beats.length == 0)
        res.status(StatusCodes.OK).json({station:station[0]})
    else{
        for(let i=0;i<temp.beats.length;i++){
            const beat_id = temp.beats[i]
            const beat = await Beat.findById(beat_id)
            beats.push(beat)
            if(i == temp.beats.length - 1){
                station[0].beats = beats
                res.status(StatusCodes.OK).json({station:station[0]})
            }
        }
    }
}

module.exports = {getStation,addStation,deleteStation,updateStation,
    getStations,assignInspector,getMyStation}