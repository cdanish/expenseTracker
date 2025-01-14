import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signUp = async (req, res) => {
    try {

        const { username, email, password, incomeCategories, expenseCategories } = req.body;

        //console.log(payload.email);

        if (!password || !email || !username) {
            return res.status(400).send({
                status: false,
                message: "please make sure added all the feilds",
            })
        }

        const checkUser = await userModel.findOne({email});
        if(checkUser){
            return res.status(400).send({
                status: false,
                message: "For this Email user is already available",
            })
        }

        //hashpassword
        const hashpassword = await bcrypt.hash(password,5);
        const createUser = await new userModel({
            username,
            email,
            password:hashpassword
        }).save();



        return res.status(200).send({
            status: true,
            message: "user created successfully",
            data:createUser,
            
        })



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "while creating user",
            error: error.message,
        })
    }
}

//login
export const login =  async(req,res) =>{
    try{

        const {email,password} = req.body;

        const checkUser = await userModel.findOne({email});

        if(!checkUser){
            return res.status(400).send({
                status: false,
                message: "this email is not available",
            })
        }

        //check password
        const checkPassword = await bcrypt.compare(password,checkUser?.password);
        //console.log(checkPassword);

        if(!checkPassword){
            return res.status(400).send({
                status: false,
                message: "this password is not available",
            })
        }

        const secrect = process.env.JWT_SECERT;

        const token = jwt.sign({userId:checkUser._id},secrect,{expiresIn:"7d"});



        return res.status(200).send({
            status:true,
            message:"logged in successfully",
            token:token,
            data:checkUser,
            
        })




    }catch(error){
        console.log(error.message);
        return res.status(500).send({
            status:false,
            message:"while login user",
            error:error?.message,
        })
    }
}