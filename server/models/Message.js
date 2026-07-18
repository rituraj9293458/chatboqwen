const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
   messages:[
        {

            role:{
                type:String
            },

            text:{
                type:String
            }

        }
    ]
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
