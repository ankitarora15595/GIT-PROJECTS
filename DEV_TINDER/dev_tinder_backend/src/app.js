  const express = require('express');

  const app = express();
  //regular expersions works 
  app.get("/user/:userid/:password",(req,res)=>{
    console.log(req.params);
    res.send({
      "fna":"Ankit",
      "lna":"Arora"
    })
  });
  app.post("/user",(req,res)=>{
    res.send("Post");
  });

  app.delete("/user",(req,res)=>{
    res.send("delete");
  });

  app.use("/test",(req,res )=> {
    res.send('Hello, World!');
  });
  
  app.listen(3000   , () => {
    console.log('Server is running on port 3000');
  }); 
 