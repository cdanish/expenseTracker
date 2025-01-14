import { Button, Table,message } from 'antd'
import React, { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import { userTrans } from '../redux/features/transSlice';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Loading from "../components/loading";
import {Link,useNavigate} from 'react-router-dom';
import {deleteTrans} from "../redux/features/transSlice";

function transactioPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(userTrans());
    },[dispatch]);

    const {loading,transactions} = useSelector((state)=> state.trans);

    if(loading) return <Loading/>
   
    const columns = [
        {
            title: "Date",
            dataIndex:"date",
            render : (date)=>{
                
                return dayjs(date).format("MMM DD, YYYY");
            }
        },
        {
            title:"Amount",
            dataIndex:"amount",
        },
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"type",
            dataIndex:"type"
        },
        {
            title:"Category",
            dataIndex:"category"
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(_,record)=>{
                //console.log(record);
                return(
                    <div className='flex gap-3'>
                        <Button type='primary' onClick={()=>{navigate(`/edittrans/${record._id}`)}}><EditOutlined/></Button>
                        <Button type='primary'danger onClick={()=>{handleDelete(record._id)}}><DeleteOutlined/></Button>
                    </div>
                )
            }
        }
    ]



    const handleDelete = (id)=>{
        console.log(id);
        dispatch(deleteTrans({id,message}));

    }

   


  return (




    <div className='flex flex-col m-6'>
        <div className='flex justify-between'>
            <h2>Transaction</h2>
            <Button><Link to={'/addtransaction'}>AddTransaction</Link></Button>
        </div>
        <div className='mt-4 capitalize'>
            <Table dataSource={transactions.map((tans)=>({...tans,key:tans._id}))} columns={columns} loading={loading}/>
        </div>
    </div>
  )
}

export default transactioPage
