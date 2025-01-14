import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    incomeCategories:{
        type:[String],
        required:true,
        default:["salary","Bonus"]

    },
    expenseCategories:{
        type:[String],
        required:true,
        default:["food","transport","shopping","grocery"]
    },

},{timestamps:true});

const userModel = mongoose.models.users || mongoose.model("users",userSchema);

export default userModel;