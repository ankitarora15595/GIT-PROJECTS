  const express = require('express');

  const app = express();
  //regular expersions works
  
  const { adminAuth,userAuth} = require("./middlewares/auth");
  app.use("/admin",adminAuth);

  app.get("/admin/AllGetData",
    (req,res)=>
    {
        res.send("Data Got Successfully");
    }
  );

  app.post("/user/login",(req,res)=>{
    res.send("Login Successful");
  });

  app.get("/user/data",userAuth,(req,res)=>{
    res.send("Data send Successful");
  });

  app.get("/admin/Delete",
    (req,res)=>
    {
        res.send("Data Deleted Successfully");
    }
  );

  
  app.listen(3000   , () => {
    console.log('Server is running on port 3000');
  }); 
 