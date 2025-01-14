import React, { useEffect, useState } from 'react';
import {Form,Button,Select,Input,message} from 'antd';
import {useParams,useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {userSingleTrans, usertransupdate} from "../redux/features/transSlice"

function Edittransactionpage() {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    

    useEffect(()=>{
       // console.log(id);
        dispatch(userSingleTrans({id,message}));
    },[id,dispatch]);

    const {usertransactions} = useSelector((state)=> state.trans);
    //console.log(usertransactions.name);
    const {user} = useSelector((state)=> state.auth);
    //scategrory
    const [scategory,setScategory] = useState([]);


    useEffect(() => {
        if (usertransactions) {
            form.setFieldsValue(usertransactions);
        }
    }, [usertransactions, form]);

    const handleEditData = (fromData) =>{
        console.log(fromData);
        dispatch(usertransupdate({fromData,id,message,navigate}));
    }
        
    return (
        <div className='flex flex-col m-5'>
            <h2 className='text-3xl mb-6 capitalize'>Edit Transaction</h2>
            
                <Form layout="vertical" form={form} onFinish={handleEditData}>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                        <Form.Item name={"name"} label="Name" rules={[{ required: true, message: "please enter name" }]} className="col-span-1 lg:col-span-2">
                            <Input />
                        </Form.Item>
                        <Form.Item name={"date"} label="Date" rules={[{ required: true, message: "please select Date" }]} className="col-span-1">
                            <Input type='date' />
                        </Form.Item>
                        <Form.Item name={"amount"} label="Amount" rules={[{ required: true, message: "please enter Amout" }]} className="col-span-1">
                            <Input />
                        </Form.Item>
                        <Form.Item name={"type"} label="Transaction Type" rules={[{ required: true, message: "please select Transaction type" }]} className="col-span-1">
                            <Select
                            
                            onChange={(value)=>{
                                if(value==="income"){
                                    setScategory(user?.incomeCategories || []);
                                }else{
                                    setScategory(user.expenseCategories || []);
                                }
                                form.setFieldsValue({ category: "" });
                               
                            }}

                            >
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name={"category"} label="Category" rules={[{ required: true, message: "please select category type" }]} className="col-span-1">
                            <Select>
                                <Select.Option value={""}>Select Category</Select.Option>
                                {scategory.map((category)=>(
                                    <Select.Option key={category} value={category}>{category}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name={"note"} label="Note" rules={[{ message: "please add one note" }]} className="col-span-3">
                            <Input.TextArea />
                        </Form.Item>
                    </div>
                    <div className='flex gap-3 justify-end mt-7'>
                        <Button type='primary' danger onClick={()=>{navigate("/transaction")}}>Cancel</Button>
                        <Button type='primary' htmlType='submit'>Save</Button>
                    </div>

                </Form>
            
        </div>
    )
}

export default Edittransactionpage
