import React, { useEffect } from 'react'
import {useSelector } from 'react-redux'
import {FaUserAstronaut} from 'react-icons/fa'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

export const AdminPanel = () => {
    const user = useSelector(state=>state.user.user)
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate('/')
        }
    },[user?.role])
    
  return (
    <div className='min-h-[calc(100vh-70px)] md:flex hidden bg-gray-50 dark:bg-dark-bg'>
        <aside className='bg-slate-100 dark:bg-dark-card w-full max-w-60 shadow-lg dark:shadow-gray-900/50 border-r dark:border-dark-border h-[calc(100vh-70px)] sticky top-[70px] overflow-y-auto'>
            <div className='p-4 min-h-32 bg-slate-200 dark:bg-dark-bg shadow-md dark:shadow-gray-900/50 flex justify-center items-center flex-col border-b dark:border-dark-border'>
                <div className='text-2xl cursor-pointer hover:scale-105 transition duration-100 dark:text-white'>
                    {
                    user?.profilePic?(
                        <img className='w-20 h-20 rounded-full ring-2 ring-primary-500 dark:ring-primary-400' src={user?.profilePic}/>)
                        :
                        (<FaUserAstronaut/>)
                    }
                </div>
                <p className='capitalize text-lg font-semibold dark:text-white mt-2'>{user?.name}</p>
                <p className='capitalize text-md font-semibold text-primary-700 dark:text-primary-400'>{user?.role}</p>
            </div>
            <div>
                <nav className='p-4 grid gap-1'>
                    <NavLink to="all-users" className={({ isActive }) =>`px-2 py-1 text-lg hover:bg-slate-200 dark:hover:bg-dark-hover dark:text-white rounded transition-colors ${isActive ? 'bg-slate-200 dark:bg-dark-hover font-semibold' : ''}`}>All Users</NavLink>
                    <NavLink to='all-products' className={({ isActive }) =>`px-2 py-1 text-lg hover:bg-slate-200 dark:hover:bg-dark-hover dark:text-white rounded transition-colors ${isActive ? 'bg-slate-200 dark:bg-dark-hover font-semibold' : ''}`}>All Products</NavLink>
                    <NavLink to='all-orders' className={({ isActive }) =>`px-2 py-1 text-lg hover:bg-slate-200 dark:hover:bg-dark-hover dark:text-white rounded transition-colors ${isActive ? 'bg-slate-200 dark:bg-dark-hover font-semibold' : ''}`}>All Orders</NavLink>
                </nav>
            </div>
        </aside>
        <main className='flex-1 min-w-0'>
            <Outlet/>
        </main>
    </div>
  )
}

