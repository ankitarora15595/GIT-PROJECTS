const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:
    {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    toUserId:
    {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    status:
    {
        type: String,
        enum:
        {
            values: ["rejected","accepted","ignored","interested"],
            message: `{Value} is not a valid status`
        }
    }

},
{ timestamps:true }
);

const ConnectionRequestModel = new mongoose.model("Connection Request",connectionRequestSchema);

module.exports = ConnectionRequestModel;