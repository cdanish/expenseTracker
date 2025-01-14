import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from './lib/db.js';
import userRouter from "./routers/userRouter.js";
import transRouter from "./routers/transRouter.js";
import AuthMiddleWare from "./middleware/requireAuth.js";

const app = express();

//dotenv
dotenv.config();

//db
ConnectDB();

//middleware
app.use(express.json());
app.use(cors());

//test done
app.get("/",(req,res)=>{
    res.send("<h2>welcome</h2>")
});

//userRouter
app.use("/api",userRouter);
//transRouter
app.use("/api",AuthMiddleWare,transRouter);




const port = process.env.PORT;

app.listen(port,()=>{

    console.log(`server running on port ${port}`)

})





