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
    <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-40'>
        <div className='mx-auto bg-white shadow-xl p-4 w-full max-w-sm'>
            <div onClick={onclose} className='flex flex-row-reverse'>
                <button>
                    <GrClose/>
                </button>
            </div>
            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            <div className='flex items-center justify-between my-4'>
                <p>Role :</p>
                <select className='border px-4 py-1' onChange={changeHandler} value={userrole} >
                    {
                        Object.values(ROLE).map((el)=>{
                            return (
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button onClick={updateUserRole} className='w-fit mx-auto block border py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-800'>Change Role</button>
        </div>
    </div>
  )
}
