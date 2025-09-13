  const express = require('express');
  const {connectDB} =  require("./config/database");
  const app = express();
  const User = require("./models/user")
  const {validationForSignup} = require("./utils/Validations")  
  const bcrypt = require("bcrypt");
  const validator = require("validator");
  const cookieParser = require("cookie-parser"); 
  const jwt = require("jsonwebtoken");
  const {userAuth} = require("./middlewares/auth");


  app.use(express.json());
  app.use(cookieParser());

  app.get("/feed",
    async(req,res)=>    {
      try{
      const user = await User.find({});
      res.send(user);
     }catch(err)
     {
      res.send("Something went wrong");
     }
    }
  );

  app.delete("/user",
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

  app.patch("/user/:userId",
    async(req,res)=>    {
      try{
      const userId = req.params?.userId;
      const data = req.body;  

      const allowedFields = [
        "userId",
        "photoUrl",
        "about",
        "skills"
      ];
      const isUpdateAllowed = Object.keys(data).every((k)=>
        allowedFields.includes(k)
      );

      if(!isUpdateAllowed)
      {
        throw new Error("NOT Valid Fields");
      }
      if(data?.skills.length>10)
      {
        throw new Error("Not More than 10 skills allowed");
      }
      await User.findByIdAndUpdate(userId,data,{
        runValidators:true,
      }
      );
      res.send("User Updated Succesfully!!");
     }catch(err)
     {
      res.status(400).send("Something went wrong");
     }
    }
  );



  app.post("/signup",
    async(req,res)=>    {
      try{
        //Validations same as DB validations
        //validationForSignup(req);

        const {firstName,lastName,emailId,password} = req.body;
        //Password Encryption  
        const passwordHash  = await bcrypt.hash(password,10);
        console.log(passwordHash);
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

  app.get("/profile",userAuth, async(req,res)=> 
  {
    try{
      res.send(req.user);
    }catch(err)
      {
        res.status(400).send("Error : "+err.message);
      }

  });
  app.get("/login",async(req,res)=>
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



  connectDB().then(()=>{
    console.log("Database connected Successfull");

    app.listen(3000   , () => {
    console.log('Server is running on port 3000');
  }); 
 
}).catch(err=>{
    console.error("Unsuccessful connections");
});
  
  