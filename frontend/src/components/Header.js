import React, { useContext, useState } from 'react'
import logo from '../assest/Logo.png'
import logo2 from '../assest/logo2.png'
import { IoMdArrowBack } from "react-icons/io";
import {BsCart3} from 'react-icons/bs'
import {FaUserAstronaut} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { setuserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context'
import { IoSearchOutline } from 'react-icons/io5';
export const Header = () => {
  const navigate = useNavigate()
  const [menu,setmenu] = useState(false);
  const [searchActive,setSearchActive] = useState(false)
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
      navigate("/")
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
  return (<>
    {searchActive && (
      <div
        className="fixed inset-0 z-40"
        onClick={() => setSearchActive(false)}
      ></div>
    )}
    {
      menu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setmenu(false)}
        ></div>
      )
    }
    <header className='flex flex-col justify-center shadow-md z-50 bg-white h-16 fixed top-0 mx-auto w-full' >
      <div className='flex items-center justify-between w-11/12 md:w-5/6 mx-auto'>
        <div className={`${searchActive ? "hidden" : "flex items-center"} `}>
          <Link className='flex items-center h-12' to="/">
            <img src={logo} className='h-8 md:h-10'/>
            <img src={logo2} className='h-8 md:h-9'/>
          </Link>
        </div>
        
        <div className={`${searchActive ? "flex gap-2" : "hidden"} lg:flex items-center justify-center rounded-full w-full lg:w-fit `}>
          <div onClick={()=>{setSearchActive(false); setSearchValue("")}}>
            {
              searchActive && <IoMdArrowBack size={25}/>
            }
          </div>
          <div className='flex w-full lg:w-fit'>
            <input onChange={(e)=>handleSearch(e)} value={searchValue} className='px-6 py-2 focus-within:border-2 focus-within:border-blue-600 outline-none border-2 rounded-l-full w-full lg:w-[350px]' type='text' placeholder='Search product here...'/>
            <div className='bg-blue-600 hover:bg-blue-800 cursor-pointer transition duration-200 flex items-center justify-center rounded-r-full w-16 py-2 text-2xl'>
              <IoSearchOutline />
            </div>
          </div>
        </div>
        
        <div className={`${searchActive ? "hidden": "flex items-center gap-3 lg:gap-6"} `}>
          <div className='lg:hidden' onClick={()=>setSearchActive(true)}>
            <IoSearchOutline size={25}/>
          </div>
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
              menu && (<div className="absolute flex justify-center flex-col w-60 bg-white top-12 p-3 -right-4 shadow-lg rounded-lg text-sm ">
              <nav className='flex flex-col gap-1'>
                {
                  user?.role===ROLE.ADMIN && 
                  <Link to='/admin-panel/all-products' className='hidden md:flex whitespace-nowrap px-2 py-4 hover:bg-blue-50 bg-slate-50 hover:ring-1 rounded-xl hover:ring-blue-600' onClick={()=>setmenu(prev=>!prev)}>Admin Panel</Link>

                }
                <Link to={'/order'} className='flex whitespace-nowrap px-2 py-4 bg-slate-50 hover:bg-blue-50 hover:ring-1 hover:ring-blue-600 rounded-xl' onClick={()=>setmenu(prev=>!prev)}>Order</Link>
                <button className='px-4 py-2 bg-white rounded-full text-red-600 border-2 w-full border-red-600  hover:bg-red-600 hover:text-white transition duration-200 hover:scale-105'
                onClick={handlelogout}>Logout</button>
              </nav>
              </div>)
            }
            
          </div>

          <div>
            {
              user?._id?(
                <button className='hidden md:block px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-200 hover:scale-105'
                onClick={handlelogout}>Logout</button>  
              ):(
                <Link to="/login">
                <button className='px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-200 hover:scale-105'>Login</button>  
                </Link>
              )
            }
            
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
