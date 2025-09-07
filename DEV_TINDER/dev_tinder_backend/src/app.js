  const express = require('express');
  const {connectDB} =  require("./config/database");
  const app = express();
  const User = require("./models/user")
  
  app.post("/signup",
    async(req,res)=>    {
      const userObj = {
        firstName : "Ankit",
        lastName : "Arora",
        emailId : "arora@ankit.com",
        password: "123asd",
        age: 30,
      }
    

      const user = new User(userObj);
      await user.save();
      res.send("User Created!!!");
    });



  connectDB().then(()=>{
    console.log("Database connected Successfull");

    app.listen(3000   , () => {
    console.log('Server is running on port 3000');
  }); 
 
}).catch(err=>{
    console.error("Unsuccessful connections");
});
  
  