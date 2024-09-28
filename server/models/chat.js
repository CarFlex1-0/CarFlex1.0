const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Link to User schema
            required: true,
        },
        title:{
            type:String
        },
        prompt: {
            type: String,
            required: true,
        },
        response: {
            carEnhancements:{
                type: String,
                required: true,
           }, 
            terrainAnalysis:{
               type: String,
               required: true,
           },
            weatherConditions:{
               type: String,
               required: true,
           }
        },
        modelUsed: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
