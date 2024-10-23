import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:false
    },
    messageType:{
        type:String,
        enum:["text", 'file'],
        required:true
    },
    content:{
        type:String,
        required:function(){
            return this.messageType === "text";
        },
    },
    fileUrl: {
        type: String,
        required: false, // Remove the required validation for now
    },
    
    timestamp: {
        type: Date,            // Correctly specify the type
        default: Date.now     // Set the default value to the current date and time
    }    
})

const Message = mongoose.model("Messages", messageSchema)

export default Message