import mongoose,{Schema} from "mongoose";

const userschema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
export const users=mongoose.models.users||mongoose.model("users",userschema)