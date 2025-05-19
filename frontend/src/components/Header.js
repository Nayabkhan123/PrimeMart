import React, { useContext, useState } from 'react'
import logo from '../assest/Logo.png'
import {HiOutlineSearch} from 'react-icons/hi'
import {BsCart3} from 'react-icons/bs'
import {FaUserAstronaut} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { setuserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context'
export const Header = () => {
  const navigate = useNavigate()
  const [menu,setmenu] = useState(false);
  const searchInput = useLocation()
  const [searchValue,setSearchValue] = useState(searchInput?.search?.split('=')[1]);
  const context = useContext(Context)
  const user = useSelector(state=>state?.user?.user)
  const dispatch=useDispatch();
  console.log("header",user?.profilePic)
  async function handlelogout(){
    const apiresponse = await fetch(SummaryApi.logout.url,{
      method:SummaryApi.logout.method,
      credentials:'include'
    })
    const apidata = await apiresponse.json();
    if(apidata.success){
      toast.success(apidata.message)
      dispatch(setuserDetails(null))
    }
    if(apidata.error){
      toast.error(apidata.message)
    }
  }
  const handleSearch = (e)=>{
    const {value} = e.target
    setSearchValue(useLocation?.search?.split('=')[1])
    if(value){
      navigate(`/search?q=${value}`)
    }
    else{
      navigate("/search")
    }
  }
  return (
    
    <header className='flex items-center justify-around w-full mx-auto h-16 shadow-md fixed top-0 z-50 bg-white'>
      <div className='flex items-center'>
        <Link to="/">
          <img src={logo} height={10} width={60}/>
        </Link>
        <p className='font-bold text-2xl text-blue-800'>PrimeMart</p>
      </div>
      <div className='hidden lg:flex focus-within:shadow-md rounded-full'>
        <input onChange={(e)=>handleSearch(e)} value={searchValue} className='px-6 py-2 outline-none border-2 rounded-l-full lg:w-[350px]' type='text' placeholder='Search product here...'/>
        <div className='bg-blue-600 hover:bg-blue-800 cursor-pointer transition duration-200 items-center justify-center flex rounded-r-full w-16 text-2xl'>
          <HiOutlineSearch/>
        </div>
      </div>
      <div className='flex items-center gap-6'>
        {
          user?._id && (
            <Link to={"/cart"} className='text-2xl relative cursor-pointer hover:scale-105 transition duration-100'>
              <span><BsCart3 /></span>

              <div className='animate-bounce absolute text-xs w-5 -top-1 -right-2 text-white flex items-center 
                    justify-center rounded-full bg-blue-600'>{context?.countTotalCartProducts}
              </div>
          
            </Link>
          )
        }

        <div className='relative flex justify-center' onClick={()=>setmenu(!menu)}>
          {
            user?._id && 
            <div className='text-2xl cursor-pointer hover:scale-105 transition duration-100'>
            {
              user?.profilePic?(
                <img className='h-8 w-8 rounded-full' src={user?.profilePic}/>)
                :
                (<FaUserAstronaut/>)
            }
          </div>
          }
          {/* menulist */}
          {
            menu && (<div className="absolute flex justify-center flex-col w-60 bg-white top-12 p-3 shadow-lg rounded-lg text-sm ">
            <nav>
              {
                user?.role===ROLE.ADMIN && 
                <Link to='/admin-panel/all-products' className='hidden md:flex whitespace-nowrap px-2 py-4 hover:bg-slate-100 bg-slate-50' onClick={()=>setmenu(prev=>!prev)}>Admin Panel</Link>

              }
              <Link to={'/order'} className='hidden md:flex whitespace-nowrap px-2 py-4 hover:bg-slate-100 bg-slate-50' onClick={()=>setmenu(prev=>!prev)}>Order</Link>
            </nav>
            </div>)
          }
          
        </div>

        <div>
          {
            user?._id?(
              <button className='px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-200 hover:scale-105'
              onClick={handlelogout}>Logout</button>  
            ):(
              <Link to="/login">
              <button className='px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-200 hover:scale-105'>Login</button>  
              </Link>
            )
          }
          
        </div>
      </div>
    </header>
  )
}
