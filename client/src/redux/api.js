import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api/"
});

//inceptor

API.interceptors.request.use((req)=>{
    try{

        const token = localStorage.getItem("token");

        if(token){
            req.headers.Authorization = `${token}`;
        }

        return req;

    }catch(error){
        console.log(error);
    }
});

//login
export const loginUser = (fromData) => API.post("/signin",fromData);

//signup
export const signUpuser = (fromData) => API.post("/signup",fromData);

//userdetails
export const userDetails = () => API.get("/userdetails");

//updateUser
export const updateUser = (fromData) => API.post("/updateUserDetails",fromData);

//getTransaction
export const allTransaction = () => API.get("/gettrans");

//addTransaction
export const addTransaction = (fromData) => API.post("/addtrans",fromData);

//deleteTransaction
export const deleteTransaction = (id) => API.delete(`/deletetrans/${id}`);

//getuserTransaction
export const userTransaction = (id) => API.get(`/singletrans/${id}`);

//updateuserTransaction
export const updateUserTransaction = ({id,fromData}) => API.patch(`/updatetrans/${id}`,fromData);
