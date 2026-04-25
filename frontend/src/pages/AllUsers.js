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
    setUpdatesUserDetails({
      userid:el._id,
      name:el.name,
      email:el.email,
      role:el.role,
    })
    setOpenRoleChangeBox(true);
  }
  
  return (
    <div className='bg-gray-50 dark:bg-dark-bg min-h-screen p-4 md:p-6'>
      {/* Header Section */}
      <div className='bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 mb-6 border dark:border-dark-border'>
        <div className='flex flex-col items-start gap-2'>
          <h2 className='font-bold text-3xl md:text-4xl text-gray-900 dark:text-white'>All Users</h2>
          <p className='text-gray-600 dark:text-gray-400'>Manage user accounts and permissions</p>
        </div>
        
        {/* Stats */}
        <div className='mt-6 pt-6 border-t dark:border-dark-border'>
          <div className='flex items-center gap-2 text-gray-700 dark:text-gray-300'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className='font-semibold text-lg'>{alluser.length}</span>
            <span className='text-sm'>Total Users</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden border dark:border-dark-border'>
        <div className='overflow-x-auto'>
          <table className="w-full">
            <thead>
              <tr className='bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white'>
                <th className='p-4 text-left font-semibold'>S No.</th>
                <th className='p-4 text-left font-semibold'>Name</th>
                <th className='p-4 text-left font-semibold'>Email</th>
                <th className='p-4 text-left font-semibold'>Role</th>
                <th className='p-4 text-left font-semibold'>Created Date</th>
                <th className='p-4 text-center font-semibold'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                alluser.map((el,index)=>(
                  <tr key={el._id} className='border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors'>
                    <td className='p-4 text-gray-900 dark:text-white font-medium'>{index+1}</td>
                    <td className='p-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold'>
                          {el?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className='text-gray-900 dark:text-white font-medium'>{el?.name}</span>
                      </div>
                    </td>
                    <td className='p-4 text-gray-700 dark:text-gray-300'>{el?.email}</td>
                    <td className='p-4'>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        el?.role === 'ADMIN' 
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        {el?.role}
                      </span>
                    </td>
                    <td className='p-4 text-gray-600 dark:text-gray-400 text-sm'>{moment(el?.createdAt).format('MMM DD, YYYY')}</td>
                    <td className='p-4 text-center'>
                      <button 
                        onClick={(event)=>{clickHandler(el,event)}} 
                        className='inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/40 transition-colors text-green-700 dark:text-green-400 font-medium'
                      >
                        <FaUserEdit/>
                        <span className='text-sm'>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        
        {alluser.length === 0 && (
          <div className='p-12 text-center'>
            <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No Users Found</h3>
            <p className='text-gray-600 dark:text-gray-400'>There are no users in the system yet</p>
          </div>
        )}
      </div>
      
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

