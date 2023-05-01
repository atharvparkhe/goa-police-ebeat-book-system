const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please provide email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,'Please provide valid email'
        ],
        unique:true, // to prevent duplication
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minlength:6,
    },
    role:{
        type:String,
        required:[true,'please provide role'],
        enum:['sp','dysp','pi','beat']
    },
    district:{   // Only for dysp
        type:String,
        default:null
    }
})

// mongoose middleware
userSchema.pre('save',async function(next){
    // this refers to query object
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// mongoose schema instance methods
userSchema.methods.getRole = function(){
    return this.role;
}

// in payload we send an object with details like userid, name to identify which user has made request
userSchema.methods.createJWT = function(){
    // jwt.sign(payload_data,secret_key,options)
    return jwt.sign({userId:this._id,role:this.role,email:this.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
userSchema.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass,this.password);
    return isMatch;
}
module.exports = mongoose.model('User',userSchema);