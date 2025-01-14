import transModel from "../models/transModel.js";
import userModel from "../models/userModel.js";

//add trans
export const creatTrans = async (req,res) =>{

    try{

        const {user} = req;
        const payload = req.body;

        //validation
        if(!payload.name || !payload.amount || !payload.type || !payload.category || !payload.date){
            return res.status(400).send({
                status:false,
                message:"please fill all details",
                
            });
        }

        const addtrans = await new transModel({...payload,user:user}).save();

        return res.status(200).send({
            status:true,
            message:"User Transaction added successfully",
            data:addtrans,
            
        });


    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while creating user Trans",
            error:error?.message,
        });
    }
}

//get tanssaction
export const getalluserTrans = async(req,res) =>{
    try{

        const {user} = req;

        const { type, category, fromDate, toDate, sortOrder } = req.query;

        //console.log(req.query);

        //add filters
        let filterToPass = {user:user};

        if(type){
            filterToPass.type = type; 
        }
        if(category){
            filterToPass.category = category;
        }

        if(fromDate && toDate){
            filterToPass.data = {
                $gte: new Date(fromDate),
                $lte : new Date(toDate),
            };
        }

        const sortOrderToPass = {
            date :sortOrder === 'asc' ? 1 : -1,
        }

        const usertrans = await transModel.find(filterToPass).sort(sortOrderToPass);

        return res.status(200).send({
            status:true,
            message:"User Transaction added successfully",
            data:usertrans,
            
        });


    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while getting user Trans",
            error:error?.message,
        });
    }

}

//update transaction
export const updateTrans = async (req,res) =>{
    try{

        const {id} = req.params;
        const payload = req.body;
        //validation
        if(!payload.name || !payload.amount || !payload.type || !payload.category || !payload.date){
            return res.status(400).send({
                status:false,
                message:"please fill all details",
                
            });
        }


        const updateTrans = await transModel.findByIdAndUpdate(id,payload);

        return res.status(200).send({
            status:true,
            message:"User Transaction updated successfully",
            data:updateTrans,
            
        });


    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while updating user Trans",
            error:error?.message,
        });
    }
}


//deletetrans
export const deleteTrans = async(req,res) =>{


    try{

        const {id} = req.params;

        await transModel.findByIdAndDelete(id);
        return res.status(200).send({
            status:true,
            message:"User Transaction Deleted successfully",
            
        });


    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while deleting user Trans",
            error:error?.message,
        });
    }

}

//getsingle transaction
export const getsingletrans = async(req,res) =>{
    try{

        const {id} = req.params;
        const usersingletrans = await transModel.findById(id);

        return res.status(200).send({
            status:true,
            message:"User Single Transaction",
            data:usersingletrans,
            
        });

        

    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while getting user single trans Trans",
            error:error?.message,
        });
    }
}

//get user details
export const getUserDetails = async(req,res) =>{
    try{

        const {user} = req;
        const userDetails = await userModel.findById({_id:user})

        return res.status(200).send({
            status:true,
            message:"User Details",
            data:userDetails,
            
        });

        

    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while user Details",
            error:error?.message,
        });
    }
}


//updateUserDetailsmeans income and expense categories

export const updateUserDetails = async(req,res) =>{
    try{

        const {user} = req;
        const { incomeCategories, expenseCategories } = req.body;
        console.log(expenseCategories);
        const updatePayload = {
            $set: {
                incomeCategories,
                expenseCategories,
            }
        };
        //console.log(payload);
        const updateuserDetails = await userModel.findByIdAndUpdate({_id:user},updatePayload,{ new: true });

        return res.status(200).send({
            status:true,
            message:"User Details Updated",
            data:updateuserDetails,
            
        });

        

    }catch(error){
        console.log(error?.message);
        return res.status(500).send({
            status:false,
            message:"while updating User Details",
            error:error?.message,
        });
    }
}
