import express from "express";
import {creatTrans,getalluserTrans,updateTrans,deleteTrans,getsingletrans,getUserDetails,updateUserDetails} from '../controller/transactionController.js'

const router = express.Router();

//testing
router.get("/test",(req,res)=>{

    return res.json({message:`${req.user}`});
});

//addtrans
router.post("/addtrans",creatTrans);

//gettrans
router.get("/gettrans",getalluserTrans);

//updatetrans
router.patch("/updatetrans/:id",updateTrans);

//deletetrans
router.delete("/deletetrans/:id",deleteTrans);

//user Single trans
router.get("/singletrans/:id",getsingletrans);

//userDetails
router.get("/userdetails",getUserDetails);

//updateUserDetails
router.post("/updateUserDetails",updateUserDetails);


export default router;