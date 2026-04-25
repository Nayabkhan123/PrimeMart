import React, { useEffect, useState } from 'react'
import ROLE from '../common/role'
import { GrClose } from "react-icons/gr";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

export const ChangeUserRole = ({userid,name,email,role,onclose,callfunc}) => {
    const [userrole,setuserrole] = useState(role)
    function changeHandler(e){
        setuserrole(e.target.value)
        console.log(e.target.value)
    }
    
    async function updateUserRole(){
        const apiresponse = await fetch(SummaryApi.updateUserRole.url,{
            method:SummaryApi.updateUserRole.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                userid:userid ,
                role:userrole,
            })
        })
        const apidata = await apiresponse.json();
        if(apidata){
            toast.success(apidata.message)
            onclose()
            callfunc();
        }
        console.log(apidata);
    }
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-800 dark:bg-black bg-opacity-40 dark:bg-opacity-60' onClick={onclose}>
        <div className='mx-auto text-lg bg-white dark:bg-dark-card shadow-xl dark:shadow-gray-900/50 p-7 w-full max-w-sm rounded-2xl text-gray-900 dark:text-white' onClick={(e)=>e.stopPropagation()}>
            <div onClick={onclose} className='flex flex-row-reverse'>
                <button className='dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'>
                    <GrClose/>
                </button>
            </div>
            <h1 className='text-2xl text-center font-semibold dark:text-white'>Change User Role</h1>
            <div className='w-full h-[1px] bg-black dark:bg-dark-border mb-4'></div>
            <div className='flex gap-2 flex-col dark:text-gray-300'>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
            
                <div className='flex items-center justify-between'>
                    <p>Role :</p>
                    <select className='border dark:border-dark-border px-4 py-1 bg-white dark:bg-dark-bg text-gray-900 dark:text-white rounded' onChange={changeHandler} value={userrole} >
                        {
                            Object.values(ROLE).map((el)=>{
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button onClick={updateUserRole} className='mx-auto block border py-2 mt-9 w-full rounded-full bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600'>Change Role</button>
            </div>
        </div>
    </div>
  )
}

