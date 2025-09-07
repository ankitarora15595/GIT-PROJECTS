 const adminAuth =
    (req,res,next)=>
    {
      const token = "xyz";
      const isAuthuorized = token==="xyz";
      if(isAuthuorized)
      {
        next();
      }
      else
      {
        res.status(401).send("UnAuthorized");
      }
    };

     const userAuth =
    (req,res,next)=>
    {
      const token = "xyz1";
      const isAuthuorized = token==="xyz";
      if(isAuthuorized)
      {
        next();
      }
      else
      {
        res.status(401).send("UnAuthorized");
      }
    };


    module.exports = {

        adminAuth,
        userAuth
    };