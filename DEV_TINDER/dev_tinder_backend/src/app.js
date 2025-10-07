  const express = require('express');
  const {connectDB} =  require("./config/database");
  const app = express();
  const cookieParser = require("cookie-parser"); 
  
  const authRouter = require("./routers/auth");
  const profileRouter = require("./routers/profile");
  const requestRouter = require("./routers/request");


  app.use(express.json());
  app.use(cookieParser());

  app.use("/",authRouter);
  app.use("/",profileRouter);
  app.use("/",requestRouter);





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

 



  connectDB().then(()=>{
    console.log("Database connected Successfull");

    app.listen(3000   , () => {
    console.log('Server is running on port 3000');
  }); 
 
}).catch(err=>{
    console.error("Unsuccessful connections");
});
  
  