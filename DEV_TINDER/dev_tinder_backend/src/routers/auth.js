const express = require('express');
const User = require("../models/user")
const {validationForSignup} = require("../utils/Validations")  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

  const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup",
    async(req,res)=>    {
      try{
        //Validations same as DB validations
        //validationForSignup(req);

        const {firstName,lastName,emailId,password} = req.body;
        //Password Encryption  
        const passwordHash  = await bcrypt.hash(password,10);
        //console.log(passwordHash);
        const user = new User({
          firstName,lastName,emailId,password :passwordHash
        });
        await user.save();
        res.send("User Created!!!");
      }catch(err)
      {
        res.status(400).send("Error : "+err.message);
      }

    });

authRouter.get("/login",async(req,res)=>
  {
    try{
      const {emailId,password} = req.body;

      if(!validator.isEmail(emailId))
      {
        throw new Error("Invaild MailId");

      }
      const user = await User.findOne({emailId:emailId});
      if(!user)
      {
        throw new Error("Invalid User!!");
      }
      const isPasswordValid = await bcrypt.compare(password,user.password);
      if (!isPasswordValid)
      {
        throw new Error("Invalid Password!!!");
      }
      else{
          const token = jwt.sign({_id:user._id},"Ankit$Arora#123",
            {expiresIn:"1h"}
          );

        res.cookie("token",token,
          {expires : new Date(Date.now()+3600000)}
        );
        res.send("Login Successfully");
      }
    }catch(err)
      {
        res.status(400).send("Error : "+err.message);
      }

  });


authRouter.get("/logout",async(req,res)=>{
    res
    .cookie("token",null,
          {expires : new Date(Date.now())}
        )
    .send("Logout Successfully");

});  
authRouter.delete("/user",
    async(req,res)=>    {
      try{
      const userId = req.body.id;  
      console.log(userId);
      const user = await User.findByIdAndDelete(userId);
      res.send(user+"User Delete Succesfully!!");
     }catch(err)
     {
      res.status(400).send("Something went wrong");
     }
    }
  );




module.exports = authRouter;