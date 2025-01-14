import jwt from "jsonwebtoken";


const AuthMiddleWare = (req,res,next) =>{
    try{

        const secrect = process.env.JWT_SECERT;
        const {authorization} = req.headers;

        if(!authorization){
            return res.status(200).send({

                status:false,
                message:"please check the token",
            });
        }

        const token = authorization;

        const {userId} = jwt.verify(token,secrect);
        req.user = userId;
        next();

    }catch(error){
        console.log(error.message);
        return res.status(500).send({

            status:false,
            message:"while getting token user",
            error:error.message,


        });
    }
}

export default AuthMiddleWare;