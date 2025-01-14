import React, { useState } from 'react';
import { Form, Button, Input, Select, message } from "antd";
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {addTrans} from "../redux/features/transSlice"
function addtransactionpage() {

    ///selector
    const { user } = useSelector((state) => state.auth);
    //console.log(user);

    //show categaroy
    const [scategaroy, setScategory] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (fromData) =>{
        console.log(fromData);
        dispatch(addTrans({fromData,navigate,message}));
        
    }


    return (
        <div className='flex flex-col m-5 '>
            <h2 className='text-3xl mb-6'>Add Transaction</h2>
            <Form layout="vertical" onFinish={onSubmit}>
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
                        <Select onChange={(value) => {
                            if (value === "income") {
                                setScategory(user.incomeCategories || []);
                            } else {
                                setScategory(user.expenseCategories || []);
                            }
                           
                        
                        }}>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"category"} label="Category" rules={[{ required: true, message: "please select category type" }]} className="col-span-1">
                        <Select>
                            <Select.Option value={""}>Select Category</Select.Option>
                            {scategaroy.map((category) => (
                                <Select.Option key={category} value={category}>{category}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"note"} label="Note" rules={[{ message: "please add one note" }]} className="col-span-3">
                        <Input.TextArea />
                    </Form.Item>
                </div>
                <div className='flex gap-3 justify-end mt-7'>
                    <Button type='primary'danger onClick={()=>{navigate("/transaction")}}>Cancel</Button>
                    <Button type='primary' htmlType='submit'>Save</Button>
                </div>

            </Form>
        </div>
    )
}

export default addtransactionpage
