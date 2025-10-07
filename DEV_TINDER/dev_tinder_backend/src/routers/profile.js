const express = require('express');
const {userAuth} = require("../middlewares/auth");
const {validateEditProfile} = require("../utils/Validations");
//const User = require("../models/user");
const bcrypt = require("bcrypt");
const user = require('../models/user');

const profileRouter = express.Router();


profileRouter.get("/profile/view",userAuth, async(req,res)=> 
  {
    try{
      res.send(req.user);
    }catch(err)
      {
        res.status(400).send("Error : "+err.message);
      }

  });

profileRouter.patch("/profile/edit", userAuth,
    async(req,res)=>    {
      try{
        if(!validateEditProfile)
        {
            throw new Error("NOT Valid Fields");
        }
        
        const userId = req.user;
        //console.log(userId.about);

        Object.keys(req.body).forEach((key)=> (userId[key] = req.body[key]));
        //console.log(userId.about);
        
        await userId.save();

        res.json({message: `${userId.firstName}, profile is  Updated Succesfully!!`,
            data: userId,
        });
     }catch(err)
     {
      res.status(400).send("Something went wrong");
     }
    }
  );

profileRouter.patch("/profile/forgotPassword",userAuth,
    async(req,res)=>{
        try{

            const oldPassword = req.body.password;
            const userId = req.user;
            //console.log(oldPassword,userId);
            const isPasswordValid = await bcrypt.compare(oldPassword,userId.password);
            if (!isPasswordValid)
            {
                throw new Error("Invalid Current Password!!!");
            }
            else{
                userId.password = await bcrypt.hash(req.body.newPassword,10);
                await userId.save();
                res.send("Password Updated Successfully!!!");
            }
        }catch(err)
        {
             res.status(400).send("Error : "+err.message);
        }
               
    }
);
 


module.exports = profileRouter;