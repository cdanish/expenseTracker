import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userTrans } from "../redux/features/transSlice"

function Statics() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userTrans());
    }, [])

    const { transactions } = useSelector((state) => state.trans);

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type == "income") {
            totalIncome = totalIncome + transaction.amount;
        } else {
            totalExpense = totalExpense + transaction.amount;
        }
    });

    let totalBalance = totalIncome - totalExpense;

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

            <div className='flex gap-2 items-center justify-between border border-solid border-gray-300 px-3 py-7'>
                <div className='w-12 h-12'>
                    <img src="/images/income.png" alt="income" className='object-cover w-full h-full' />
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-md text-gray-600 text-end capitalize'>Total Income</p>
                    <div className='flex items-center gap-4  justify-end text-green-600'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="w-12 h-12 fill-current"
                        >
                            <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" />
                        </svg>
                        <h3 className='text-4xl'>{totalIncome}</h3>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 items-center justify-between border border-solid border-gray-300 px-3 py-7'>
                <div className='w-12 h-12'>
                    <img src="/images/expenses.png" alt="income" className='object-cover w-full h-full' />
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-md text-gray-600 text-end capitalize'>Total Expense</p>
                    <div className='flex items-center gap-4  justify-end text-red-950'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="w-12 h-12 fill-current"
                        >
                            <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" />
                        </svg>
                        <h3 className='text-4xl'>{totalExpense}</h3>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 items-center justify-between border border-solid border-gray-300 px-3 py-7'>
                <div className='w-12 h-12'>
                    <img src="/images/expenses.png" alt="income" className='object-cover w-full h-full' />
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-md text-gray-600 text-end capitalize'>Total wallet Blance</p>
                    <div className='flex items-center gap-4  justify-end text-orange-500'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="w-12 h-12 fill-current"
                        >
                            <path d="M0 64C0 46.3 14.3 32 32 32l64 0 16 0 176 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-56.2 0c9.6 14.4 16.7 30.6 20.7 48l35.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-35.6 0c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256l80 0c32.8 0 61-19.7 73.3-48L32 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l153.3 0C173 115.7 144.8 96 112 96L96 96 32 96C14.3 96 0 81.7 0 64z" />
                        </svg>
                        <h3 className='text-4xl'>{totalBalance}</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Statics
