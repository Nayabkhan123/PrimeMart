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


  function clickHandler(el){
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
    <div>
      <table className="w-full usertable ">
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
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
                <td>{index+1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('lll')}</td>
                <th>
                  <button onClick={()=>clickHandler(el)} className='bg-green-200 p-2 text-lg rounded-full hover:bg-green-400 '>
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
