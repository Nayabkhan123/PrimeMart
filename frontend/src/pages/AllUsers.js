import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import {toast} from 'react-toastify'
import moment from 'moment'
import { FaUserEdit } from "react-icons/fa";
import { ChangeUserRole } from '../components/ChangeUserRole';

export const AllUsers = () => {
  const [alluser,setalluser] = useState([])
  const [openRoleChangeBox,setOpenRoleChangeBox] = useState(false)
  const [updateUserDetails,setUpdatesUserDetails] = useState({
    userid:"null",
    email:"",
    name:"",
    role:""
  })
  async function fetchAllUsers(){
    const apiresponse = await fetch(SummaryApi.allusers.url,{
      method:SummaryApi.allusers.method,
      credentials:'include'
    })
    const apidata = await apiresponse.json();
    if(apidata.success){
      setalluser(apidata.data);
    }
    if(apidata.error){
      toast.error(apidata.message)
    }
  }
  useEffect(()=>{
    fetchAllUsers();
  },[])


  function clickHandler(el,event){
    // event.stopPropagation()
    setUpdatesUserDetails({
      userid:el._id,
      name:el.name,
      email:el.email,
      role:el.role,
    })
    console.log(el._id)
    setOpenRoleChangeBox(true);
    
  }
  return (
    <div className='mt-10 mx-6 flex gap-3 flex-col'>
      <h2 className='text-center font-semibold text-4xl text-slate-800'>List of All Users</h2>
      <table className="w-full usertable">
        <thead>
          <tr className='bg-slate-700 text-white'>
            <th className='p-4'>S No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            alluser.map((el,index)=>(
              <tr>
                <td className='p-4'>{index+1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('lll')}</td>
                <th>
                  <button onClick={(event)=>{clickHandler(el,event)}} className='bg-green-200 p-2 text-lg rounded-full hover:bg-green-400 '>
                    <FaUserEdit/>
                  </button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        openRoleChangeBox && <ChangeUserRole 
        userid={updateUserDetails.userid}
        name = {updateUserDetails.name}
        email = {updateUserDetails.email}
        role = {updateUserDetails.role}
        onclose = {()=>setOpenRoleChangeBox(false)}
        callfunc= {fetchAllUsers}/>
      }
    </div>
    
  )
}
