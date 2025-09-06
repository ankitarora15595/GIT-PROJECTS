  const express = require('express');

  const app = express();


  app.use("/test",(req,res )=> {

    app.use("/bye",(req,res )=> {
      res.send("Bye!!!");
    });
    res.send('Hello, World!');
  });
  app.use("/",(req,res)=>{
    res.send("Default");
  });
  app.listen(3000   , () => {
    console.log('Server is running on port 3000');
  }); 
 