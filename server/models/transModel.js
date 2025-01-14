import mongoose from "mongoose";

const transSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String, //of thing for income or expense
        required: true,

    },
    amount:{
        type :Number,
        required:true,
    },
    type: {
        type: String, //only two types income or expense
        required: true,

    },
    category: {
        type: String, //category for income or expense or selection
        required: true,
    },
    date: {
        type: String, ///adding date
        required: true,
    },
    note: {
        type: String,
        
    }
});

const transModel = mongoose.models.trans || mongoose.model("trans",transSchema);

export default transModel;