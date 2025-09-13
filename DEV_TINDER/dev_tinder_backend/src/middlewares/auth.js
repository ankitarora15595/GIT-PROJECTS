const jwt = require("jsonwebtoken");
const User = require("../models/user");



//  const adminAuth =
//     (req,res,next)=>
//     {
//       const token = "xyz";
//       const isAuthuorized = token==="xyz";
//       if(isAuthuorized)
//       {
//         next();
//       }
//       else
//       {
//         res.status(401).send("UnAuthorized");
//       }
//     };

const userAuth =
    async (req,res,next)=>
    {
      try{
            const {token} = await req.cookies;
            console.log(token);
            if(!token)
            {
              throw new Error("Invalid Login!!!");
            }
      
            const {_id} = await jwt.verify(token,"Ankit$Arora#123");
      
            console.log(_id);
            
            const user = await User.findById(_id);
            if(!user)
            {
              throw new Error("User Not Found");
            }
            req.user = user;
            next();
          }catch(err)
            {
              res.status(400).send("Error : "+err.message);
            }
    };


    module.exports = {

        //adminAuth,
        userAuth
    };