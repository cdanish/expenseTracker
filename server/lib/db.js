import mongoose from "mongoose";

const ConnectDB = async() =>{

    try{

        const url = process.env.MONGO_URL;
        await mongoose.connect(url);

        console.log(`connected Db`);


    }catch(error){
        console.log(error);
    }

}

export default ConnectDB