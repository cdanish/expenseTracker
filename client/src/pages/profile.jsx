import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading'
import { Button, Input, message, Modal, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { updateuser } from '../redux/features/authSlice';

function profile() {
    const {loading,user} = useSelector((state)=> state.auth);


    //model
    const [isModleV,setIsModleV] = useState(false);

    //categoryType
    const [categoryT,setCategoryT] = useState('');
    //newcategory
    const [newCategory,setNewCategory] = useState('');
    

    //income
    const [incomeCategories,setIncomeCategories] = useState([]);
    //expense
    const [expenseCategories,setExpenseCategories] = useState([]);
    useEffect(()=>{
        if(user){
            setIncomeCategories(user?.incomeCategories || []);  
            setExpenseCategories(user?.expenseCategories || []);
        }
    },[user]);


    ///handle close tag
    const handleCloseTag = (type,category)=>{

        if(type === 'Income'){
            setIncomeCategories(incomeCategories.filter((cat)=> cat !==category));
        }else if(type === 'Expense'){
            setExpenseCategories(expenseCategories.filter((cat)=> cat !== category));
        }

    }


    //show model and type
    const showModel = (type)  =>{
        setCategoryT(type);
        setIsModleV(true);
    }

    //modelopen
    const handleOk = () =>{

        if(!newCategory.trim()){
            message.error(`please enter ${categoryT} name`);
            return;
        }

        if(categoryT === "Income"){
            setIncomeCategories([...incomeCategories,newCategory]);
        }
        if(categoryT === "Expense"){
            setExpenseCategories([...expenseCategories,newCategory]);
        }
        setNewCategory('');
        setIsModleV(false);
        message.success(`${categoryT} add successfully`);

    }
    //cancelpopup
    const handleCancle = () =>{
        setIsModleV(false);
    }
    

    //navigate
    const navigate = useNavigate();

    //dispatch
    const dispatch = useDispatch();


     //update user
     const handleUpdate = () =>{
        dispatch(updateuser({incomeCategories,expenseCategories,navigate,message}));

       //console.log(incomeCategories,expenseCategories);
    }


    if(loading) return <Loading/>

  return (
    <div className='m-5 flex flex-col'>
        <h1 className='text-3xl capitalize font-bold'>Profile</h1>
        <div className='grid grid-cols-3 gap-3 mt-8'>
            <div className='flex flex-col gap-2'>
               <h3 className='text-xl capitalize'>Name</h3> 
               <p className='text-md'>{user && user?.username}</p>
            </div>
            <div className='flex flex-col gap-2'>
               <h3 className='text-xl capitalize'>Email</h3> 
               <p className='text-md'>{user && user?.email}</p>
            </div>
            <div className='flex flex-col gap-2'>
               <h3 className='text-xl capitalize'>User name</h3> 
               <p className='text-md'>{user && user?.username}</p>
            </div>
            <div className='flex flex-col gap-2'>
               <h3 className='text-xl capitalize'>id</h3> 
               <p className='text-md'>{user && user?._id}</p>
            </div>
            <div className='flex flex-col gap-2'>
               <h3 className='text-xl capitalize'>joined at</h3> 
               <p className='text-md'>{user && user?.createdAt}</p>
            </div>
        </div>

        <div className='mt-7 flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>Income Categories</h1>
            <Button onClick={()=>showModel("Income")}>Add</Button>
        </div>

        <div className='flex gap-2 flex-wrap mt-5'>
            {incomeCategories.map((category)=>{
                return (
                    <Tag key={category} closable onClose={()=>handleCloseTag('Income',category)}>
                        {category}
                    </Tag>
                )
            })}
        </div>

        <div className='mt-7 flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>Expense Categories</h1>
            <Button onClick={()=>showModel("Expense")}>Add</Button>
        </div>

        <div className='flex gap-2 flex-wrap mt-5'>
            {expenseCategories && expenseCategories.map((category)=>{
                return (
                    <Tag key={category} closable onClose={()=>handleCloseTag('Expense',category)}>
                        {category}
                    </Tag>
                )
            })}
        </div>

        <div className='flex flex-col justify-end mt-7 w-auto'>
            <Button type='primary' onClick={handleUpdate}>Update User</Button>
        </div>



        {/* ///model */}
        <Modal title={`Add ${categoryT} Cetgory`} open={isModleV} onOk={handleOk} onCancel={handleCancle}  okText='Add' cancelText="cancel">
            <Input placeholder={`please add ${categoryT}`} value={newCategory} onChange={(e)=>setNewCategory(e.target.value)}/>
        </Modal>

    </div>
  )
}

export default profile
