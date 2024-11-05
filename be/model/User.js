const mongoose = require('mongoose')



const UserScheme = mongoose.Schema({
    userName :{
        type:String,
        require:true,
        unique:true,
    },
    email :{
        type:String,
        require:true,
        unique:true,
    },
    password :{
        type:String,
        require:true,
       
    },
    role:{
            type:String,
            default:'user',
    }
})
const User = mongoose.model("User",UserScheme);
module.exports = User