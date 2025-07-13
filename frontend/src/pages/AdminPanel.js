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
    <div className='h-[calc(100vh-70px)] md:flex hidden overflow-y-hidden'>
        <aside className='bg-slate-100 w-full max-w-60 customShadow'>
            <div className='p-4 min-h-32 bg-slate-200 shadow-md flex justify-center items-center flex-col'>
                <div className='text-2xl cursor-pointer hover:scale-105 transition duration-100'>
                    {
                    user?.profilePic?(
                        <img className='w-20 h-20  rounded-full' src={user?.profilePic}/>)
                        :
                        (<FaUserAstronaut/>)
                    }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='capitalize text-md font-semibold text-blue-700'>{user?.role}</p>

            </div>
            <div>
                <nav className='p-4 grid gap-1'>
                    <NavLink to="all-users" className={({ isActive }) =>`px-2 py-1 text-lg hover:bg-slate-200 ${isActive ? 'bg-slate-200 font-semibold' : ''}`}>All Users</NavLink>
                    <NavLink to='all-products' className={({ isActive }) =>`px-2 py-1 text-lg hover:bg-slate-200 ${isActive ? 'bg-slate-200 font-semibold' : ''}`}>Products</NavLink>
                </nav>
            </div>
        </aside>
        <main className='w-full overflow-y-auto'>
            <Outlet/>
        </main>
    </div>
  )
}
