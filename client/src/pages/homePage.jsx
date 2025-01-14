import React from 'react';
import Loading from "../components/loading";
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Statics from '../components/statics';
import AnalysisChart from '../components/analysisChart';

function homePage() {

    const {loading} = useSelector((state)=> state.auth);
    //console.log(loading);

    if(loading) return <Loading/>

    

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between m-5'>
        <h2 className='text-3xl'>Dashboard</h2>
        <Button><Link to={"/transaction"}>Transaction</Link></Button>
      </div>
      <div className='flex flex-col m-5 gap-4'>
        <Statics/>
        <AnalysisChart/>

      </div>
      
    </div>
  )
}

export default homePage
