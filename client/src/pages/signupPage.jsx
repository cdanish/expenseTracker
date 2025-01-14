import React from 'react'
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/features/authSlice";
import { message } from 'antd';


function signupPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = (fromData) =>{
        //console.log(fromData);
        dispatch(signUpUser({fromData,navigate,message}));

    }
    return (
        <div className='bg-black h-screen flex flex-col justify-center items-center'>
            <div className='bg-white rounded-md p-5 mx-auto w-[400px]'>
                <h2 className='text-2xl text-center capitalize mb-3'>SignUp Page</h2>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
                    <Form.Item label="UserName" name={"username"} rules={[{ required: true, message: "please enter your name" }]}>
                        <Input placeholder='please enter your email' />
                    </Form.Item>
                    <Form.Item label="Email" name={"email"} rules={[{ required: true, message: "please enter your email" }]}>
                        <Input placeholder='please enter your email' />
                    </Form.Item>
                    <Form.Item label="PassWord" name={"password"} rules={[{ required: true, message: "please enter your password" }]}>
                        <Input.Password placeholder='please enter your password' />
                    </Form.Item>
                    <Button type='primary' className='w-full' htmlType="submit">Submit</Button>
                </Form>
                <p className='w-full text-center py-2'><Link to={"/login"} className='cursor-pointer text-blue-500'>If your are SignUp please Login</Link></p>
                

            </div>
        </div>
    )
}

export default signupPage
