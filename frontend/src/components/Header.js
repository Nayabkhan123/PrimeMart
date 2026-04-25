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
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const navigate = useNavigate()
  const [menu,setmenu] = useState(false);
  const [searchActive,setSearchActive] = useState(false)
  const searchInput = useLocation()
  const [searchValue,setSearchValue] = useState(searchInput?.search?.split('=')[1]);
  const context = useContext(Context)
  const user = useSelector(state=>state?.user?.user)
  const dispatch=useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();

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
        className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
        onClick={() => setSearchActive(false)}
      ></div>
    )}
    {
      menu && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          onClick={() => setmenu(false)}
        ></div>
      )
    }
    <header className='flex flex-col justify-center shadow-lg dark:shadow-gray-900/50 z-50 bg-white dark:bg-dark-bg border-b dark:border-dark-border h-16 fixed top-0 mx-auto w-full transition-colors duration-200' >
      <div className='flex items-center justify-between w-11/12 md:w-5/6 mx-auto'>
        <div className={`${searchActive ? "hidden" : "flex items-center"} `}>
          <Link className='flex items-center h-12 group' to="/">
            <img src={logo} className='h-8 md:h-10 group-hover:scale-105 transition-transform duration-200'/>
            <img src={logo2} className='h-8 md:h-9 group-hover:scale-105 transition-transform duration-200 dark:invert'/>
          </Link>
        </div>
        
        <div className={`${searchActive ? "flex gap-2" : "hidden"} lg:flex items-center justify-center rounded-full w-full lg:w-fit `}>
          <div onClick={()=>{setSearchActive(false); setSearchValue("")}}>
            {
              searchActive && <IoMdArrowBack size={25} className='dark:text-white cursor-pointer hover:scale-110 transition-transform'/>
            }
          </div>
          <div className='flex w-full lg:w-fit'>
            <input 
              onChange={(e)=>handleSearch(e)} 
              value={searchValue} 
              className='px-6 py-2 focus-within:border-2 focus-within:border-primary-600 dark:focus-within:border-primary-500 outline-none border-2 border-gray-200 dark:border-dark-border rounded-l-full w-full lg:w-[350px] bg-white dark:bg-dark-card dark:text-white transition-colors duration-200' 
              type='text' 
              placeholder='Search product here...'
            />
            <div className='bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 cursor-pointer transition-all duration-200 flex items-center justify-center rounded-r-full w-16 py-2 text-2xl text-white hover:scale-105'>
              <IoSearchOutline />
            </div>
          </div>
        </div>
        
        <div className={`${searchActive ? "hidden": "flex items-center gap-3 lg:gap-6"} `}>
          <div className='lg:hidden dark:text-white' onClick={()=>setSearchActive(true)}>
            <IoSearchOutline size={25} className='cursor-pointer hover:scale-110 transition-transform'/>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className='text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-200 hover:scale-110 dark:text-yellow-400'
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative cursor-pointer hover:scale-110 transition-transform duration-200 dark:text-white group'>
                <span><BsCart3 /></span>
                <div className='animate-bounce absolute text-xs w-5 h-5 -top-1 -right-2 text-white flex items-center 
                      justify-center rounded-full bg-primary-600 dark:bg-primary-500 group-hover:scale-110 transition-transform shadow-lg'>
                  {context?.countTotalCartProducts}
                </div>
              </Link>
            )
          }

          <div className='relative flex justify-center' onClick={()=>setmenu(!menu)}>
            {
              user?._id && 
              <div className='text-2xl cursor-pointer hover:scale-110 transition-transform duration-200 dark:text-white'>
              {
                user?.profilePic?(
                  <img className='h-8 w-8 rounded-full ring-2 ring-primary-500 dark:ring-primary-400' src={user?.profilePic}/>)
                  :
                  (<FaUserAstronaut/>)
              }
            </div>
            }
            {/* menulist */}
            {
              menu && (<div className="absolute flex justify-center flex-col w-60 bg-white dark:bg-dark-card top-12 p-3 -right-4 shadow-xl dark:shadow-gray-900/50 rounded-xl text-sm border dark:border-dark-border animate-scale-in z-50">
              <nav className='flex flex-col gap-2'>
                {
                  user?.role===ROLE.ADMIN && 
                  <Link to='/admin-panel/all-products' className='hidden md:flex whitespace-nowrap px-4 py-3 hover:bg-primary-50 dark:hover:bg-dark-hover bg-gray-50 dark:bg-dark-bg hover:ring-2 rounded-xl hover:ring-primary-500 dark:hover:ring-primary-400 transition-all duration-200 dark:text-white' onClick={()=>setmenu(prev=>!prev)}>
                    Admin Panel
                  </Link>
                }
                <Link to={'/order'} className='flex whitespace-nowrap px-4 py-3 bg-gray-50 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-dark-hover hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 rounded-xl transition-all duration-200 dark:text-white' onClick={()=>setmenu(prev=>!prev)}>
                  My Orders
                </Link>
                <button className='px-4 py-3 bg-white dark:bg-dark-card rounded-xl text-red-600 dark:text-red-400 border-2 w-full border-red-600 dark:border-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-105 font-medium'
                onClick={handlelogout}>Logout</button>
              </nav>
              </div>)
            }
          </div>

          <div>
            {
              user?._id?(
                <button className='hidden md:block px-5 py-2.5 bg-primary-600 dark:bg-primary-500 rounded-full text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium'
                onClick={handlelogout}>Logout</button>  
              ):(
                <Link to="/login">
                <button className='px-5 py-2.5 bg-primary-600 dark:bg-primary-500 rounded-full text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium'>Login</button>  
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

