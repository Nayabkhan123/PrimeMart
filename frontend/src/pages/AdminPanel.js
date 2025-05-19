import React, { useEffect } from 'react'
import {useSelector } from 'react-redux'
import {FaUserAstronaut} from 'react-icons/fa'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className=' bg-slate-100 min-h-full w-full max-w-60 customShadow'>
            <div className='p-4 min-h-32 bg-slate-300 shadow-md flex justify-center items-center flex-col'>
                <div className='text-2xl cursor-pointer hover:scale-105 transition duration-100'>
                    {
                    user?.profilePic?(
                        <img className='h-20 w-20 rounded-full' src={user?.profilePic}/>)
                        :
                        (<FaUserAstronaut/>)
                    }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='capitalize text-md font-semibold'>{user?.role}</p>

            </div>

            <div>
                <nav className='p-4 grid'>
                    <Link to='all-users' className='px-2 py-1 text-lg hover:bg-slate-200'>All Users</Link>
                    <Link to='all-products' className='px-2 py-1 text-lg hover:bg-slate-200'>Products</Link>
                </nav>
            </div>
        </aside>
        <main className='w-full'>
            <Outlet/>
        </main>
    </div>
  )
}
