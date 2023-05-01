const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide station name"],
    },
    sub_id:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please provide subdivion id"],
    },
    pi:{
        type:mongoose.Types.ObjectId,
        default:null
    },
    coords:{
        type:Array,
        minlenght:4
    },
    beats:{
        type:Array,
        default:[]
    }
},{timestamps:true}) 

module.exports = mongoose.model('Station',StationSchema);