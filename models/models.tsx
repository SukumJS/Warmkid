import {Schema,model} from "mongoose";



const userSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    ClickArry : [
        {
            type:Number,
            required:true
        }
    ],
    Game : {
        type: [Boolean],
    }
});


export const User = model("User",userSchema);


const Click = new Schema({
    user_id : {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date : {
        type:Date,
        required:true
    },
});

export const ClickModel = model("Click",Click);