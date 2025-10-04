const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require('dotenv').config();


let userModel = require('../models/user.js')

function generateToken(userId){
  let payload ={userId:userId};
  let options = {
    expiresIn : '30m'
  }
  return jwt.sign(payload,process.env.SECRET_KEY,options);
}


let findUser = async (req, res) => {
  let {id} = req.query;
  try {
    let user;

    user = await userModel.findOne({_id:id});


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(`Error finding user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};


let loginUser = async (req,res)=>{

let user ={
  email : req.body.email,
  password : req.body.password,
}

try{
  let findRes = await userModel.findOne({email : user.email});

 if(!findRes){
    return res.status(404).json({ error: "User not found" });}

  const isSamePassword = await bcrypt.compare(user.password,findRes.password);
  if(isSamePassword){
  let token = generateToken(findRes._id);
  res.status(200).json({message:"login successful",token,user:findRes});
  } else{
    res.status(401).json({message:"Incorrect Password"});
  }

  }
  catch(error){
   console.error(`Error finding user: ${error.message}`);
   res.status(500).json({ error: error.message });
}}

let registerUser = async (req, res) => {

  const {username, email, password } = req.body;

  try {
    const userInfo = await userModel.findOne({ email });
    if (userInfo) {
      return res.status(201).json({message : "Email already registered"});
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const user = new userModel({
      username,
      email,
      password : hashedPassword,
      role:"client"
    });

    const registerRes = await user.save();
  

    let token = generateToken(registerRes._id)

    res.status(201).json({message : "Registration Successful",token,user:registerRes});
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const autoLoginUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userInfo = await userModel.find({_id:decoded.userId});

    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userInfo);

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    console.error('Error fetching user info:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {registerUser,loginUser,autoLoginUser,findUser};