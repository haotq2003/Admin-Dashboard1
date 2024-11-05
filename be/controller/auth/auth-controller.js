const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../../model/User');



//register
 const register = async (req,res) =>{
    const {userName,email,password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(checkUser) return res.json({
            success:false,
            message:"User already exists with the same email"
        })
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,email,password:hashPassword,
        });
        await newUser.save();
        res.status(201).json({
            success:true,
            message:"Register succesful",
        })
    } catch (error) {
        console.log("loi ne",error);
        res.status(500).json({
            success:false,
            message:"Some error",
        })
    }
 }


//login
 const login = async (req,res) =>{
    const {email,password} = req.body;
   try {
    const checkUser = await User.findOne({email});
    if(!checkUser) return res.json({
        success:false,
        message:'User does not exits'
    });
    const checkPassword = await bcrypt.compare(
        password,
        checkUser.password
    );
    if(!checkPassword) 
        return res.json({
      success:false,
      message:'Incorrect password'
        });
    const token = jwt.sign({
        id: checkUser._id,
        role : checkUser.role,
        email : checkUser.email,
        userName : checkUser.userName,
    },
  "CLIENT_SECRET_KEY",{
    expiresIn:"60m"
  }
);
   res.cookie("token",token, {httpOnly:true,secure:false}).json({
    success:true,
    message: "Logged in successfully",
    user: {
      email: checkUser.email,
      role: checkUser.role,
      id: checkUser._id,
      userName: checkUser.userName,
    },
   })  
   } catch (error) {
    res.status(500).json({
        success: false,
        message: "Some error occured",
      });
   }  
 }
//logout

module.exports = {register,login}

