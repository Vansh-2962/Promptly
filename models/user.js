import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email already exists']
    },
    username:{
        type:String,
        required:[true,'username is required'],
    },
    image:{
        type:String,
    }
})

export default models.User || model('User',userSchema)