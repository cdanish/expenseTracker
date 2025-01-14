import React, { useEffect } from "react";
import {useLocation,useNavigate} from 'react-router-dom'
 
const protectedRoutes = ({children}) =>{

    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");

    useEffect(()=>{
        if(token && (location.pathname=== "/login" || location.pathname === "/signup")){
            navigate("/");
        }
    
        if(!token && (location.pathname !== "/login" || location.pathname !=="/signup")){
            navigate("/login");
        }
    },[]);

    return children;

}

export default protectedRoutes  