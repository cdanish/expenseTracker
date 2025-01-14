import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {useSelector,useDispatch} from "react-redux"
import { logout, userdetails } from '../redux/features/authSlice';
import {clearTrans} from "../redux/features/transSlice";
import Loading from "./loading";

function Navbar() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(()=>{
    dispatch(userdetails());
  },[])
  
  const {loading,user} = useSelector((state)=> state.auth);

  if(loading) return <Loading/>

  const onlogout = () =>{
    dispatch(logout());
    dispatch(clearTrans());
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className='bg-black p-5 flex justify-between items-center'>
      <div>
        <h2 className='text-3xl text-white cursor-pointer'><Link to={"/"} className='text-3xl text-blue-400 cursor-pointer no-underline'>Expense Tracker</Link></h2>
      </div>
      <div className='flex gap-4 text-white'>
      <UserOutlined className='text-lg' />
        <h2 className='capitalize'><Link to={"/profile"} className='text-white no-underline cursor-pointer hover:text-blue-300'>user: {user?.username}</Link></h2>
        <Button type='primary' danger onClick={onlogout}>Logout</Button>

      </div>
    </div>
  )
} 

export default Navbar
