const mongoose = require('mongoose');

const SubDivisionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide subdivion  name"],
    },
    coords:{
        type:Array,
        minlenght:4
    },
    district:{
        type:String,
        required:[true,"Please provide district (north,south)"],
        enum:['north','south']
    },
    stations:{
        type:Array,
        default:[]
    }
},{timestamps:true}) 

module.exports = mongoose.model('SubDivison',SubDivisionSchema);