const validators = require("validator");


const validationForSignUp = (req)=>
{   

    console.log("data validated!!!");
} 

const validateEditProfile = (req)=>
{    const data = req.body;  

      const allowedFields = [
        "photoUrl",
        "about",
        "skills",
        "age",
      ];
      const isUpdateAllowed = Object.keys(data).every((k)=>
        allowedFields.includes(k)
      );
      
    return isUpdateAllowed;
}
module.exports = {
    validationForSignUp,
    validateEditProfile,
}