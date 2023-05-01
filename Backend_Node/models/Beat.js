const mongoose = require('mongoose');

const BeatSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide beat name"],
    },
    station_id:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please provide station id"]
    },
    constable:{
        type:mongoose.Types.ObjectId,
        default:null
    },
    coords:{
        type:Array,
        minlenght:4
    }
},{timestamps:true}) 

module.exports = mongoose.model('Beat',BeatSchema);