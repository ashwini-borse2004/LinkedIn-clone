
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async(req, res) =>
{
  // 1. get the details
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !email || !password)
    {
        return res.status(400).json({
            message:"Invalid request body",
            success:true,
        });
    }
    //2. check existing status of user
    const existingUser = await User.findOne({email:email});
    if(existingUser)
    {
        return res.status(402).json({
            message:"A user with this mail already exists",
            success:false,

        });
    }
    // 3. conversion of user password to encrypted one by using hashing
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserDetails = {
        firstName,
        lastName,
        password:hashedPassword,
        email,
    };
    const newUser = await User.create(newUserDetails);
  // 4. I can use the newUser to create a JWT and return the token to the user
  const token = await getToken(email, newUser);
  // we want to return the following details to user
  // 1. The actual user created
  // 2. The token

  
  const userToReturn = {...newUser.toJSON(), token};
  delete userToReturn.password;
  return res.status(200).json(userToReturn); 
});
 router.post("/login", async (req,res)=>{
   //step 1:we get the details from yhe req.body

   const {email, password}=req.body;

   //step 2: verify if a user exists with that email
   const user = await User.findOne({email: email});
   if(!email || !password){
    return res.status(401).json({err:"Invalid username or password"});
   }
   if(!user){
    return res.status(401).json({err: "Invalid username or password"});
   }

   //step 3: verify if the password provided by the user for login is correct
   //this is tricky part
   //direct password comparison will not work password==user.passwrod
   const isPasswordValid = await bcrypt.compare(password, user.password);
   if(!isPasswordValid){
    return res.status(401).json({err: "Invalid username or password"});
   }


   //step 4: generate a token for the user and return it
   
   const token= await getToken(email, newUser);
   //we want to return following to the userSelect: 
   //1. the  actual user created
   //2. the token
   const userToReturn ={...newUser.toJson(), token};
   delete userToReturn.password;
   return res.status(200).json(userToReturn);
   

});

module.exports=router;
