const mongoose = require("mongoose");
const validators = require("validator");
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true,
            minLen:2,
            maxLen:50,
            trim:true
        },
        lastName:{
            type: String,
            trim:true
        },
        emailId:{
            type: String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            validate(value)
            {
                if(!validators.isEmail(value))
                {
                    throw new Error("Invalid Mail Address : "+value);
                }
            }
        },
        password:{
            type: String,
            trim:true,
            validate(value)
            {
                if(!validators.isStrongPassword(value))
                {
                    throw new Error("It is a Weak Password");
                }
            }
        },
        age:{
            type: Number,
            min:18
        },
        gender:{
            type: String,
            validate(value){
                if(!["male","female","others"].includes(value))
                {
                    throw new Error("NOT VALID GENDER DATA!!!");
                }
            },
        },
        photoUrl:{
            type:String,
            default:"www.google.com",
            validate(value)
            {
                if(!validators.isURL(value))
                {
                    throw new Error("Invalid Photo URL : "+value);
                }
            }
        },
        about:
        {
            type:String,
            default:"Hey, I am New to Dev Tinder"
        },
    
        skills:{
            type:[String]
        }

    },
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);