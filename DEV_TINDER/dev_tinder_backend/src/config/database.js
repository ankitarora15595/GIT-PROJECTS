const mongoose = require("mongoose");

const connectDB = async()=>
{
    await mongoose.connect("mongodb+srv://aroraankit015:5NjnEwM20hvAs6yl@lecture1.jz1rmyu.mongodb.net/devTinder");
};

module.exports = {
    connectDB,
};