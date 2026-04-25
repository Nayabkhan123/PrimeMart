import React, { useContext, useState } from 'react'
import loginIcon from '../assest/loginIcon.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import loginImage from '../assest/login.jpg'
export const Login = () => {
    const Navigate=useNavigate()
    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)
    console.log("login page fetchuserdetails",fetchUserDetails())
    const [showpassword,setshowpassword] =useState(true);
    const [data,setData] = useState({
        email:"",
        password:"",
    })
    function changeHandler(e){
        const {name,value}=e.target;
        setData((prev)=>{
            return {
                ...prev,[name]:value
            }
        })
    }
    async function submitHandler(e){
        e.preventDefault();
        try{
            const apiresponse = await fetch(SummaryApi.login.url,{
                method:SummaryApi.login.method,
                headers:{
                    "content-type" : "application/json",
                    'ngrok-skip-browser-warning': 'true'
                },
                credentials:'include',
                body:JSON.stringify(data),
            })
            const apidata = await apiresponse.json();
            console.log(apidata)
            if(apidata.success){
                if(fetchUserDetails) fetchUserDetails()
                toast.success(apidata.message)
                Navigate("/")
                fetchUserAddToCart()
            }
            if(apidata.error){
                toast.error(apidata.message);
            }
        }
        catch(err){
            console.log("login API not working" , err)
        }
    }
    console.log(data);
  return (
    <section id='login' 
    className="relative flex items-center justify-center p-2 min-h-screen bg-cover bg-center dark:bg-dark-bg"
    style={{ backgroundImage: window.innerWidth >= 1024 ? `url(${loginImage})` : "none" }}>
            <div className='bg-white dark:bg-dark-card lg:ml-12 border-black dark:border-dark-border border-[1px] py-12 w-full mx-auto max-w-lg flex flex-col rounded-2xl shadow-lg dark:shadow-gray-900/50'>
                <div className='animate-bounce mx-auto'>
                    <img className='rounded-full' src={loginIcon} width={150}/>
                </div>
                <form className='grid px-10 gap-2 text-lg text-gray-900 dark:text-white' onSubmit={(event)=>submitHandler(event)}>
                    <div>
                        <label htmlFor='email' className='dark:text-gray-300'>Email:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500 dark:border-dark-border bg-white dark:bg-dark-bg rounded'>
                            <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-600 dark:placeholder:text-gray-500 text-gray-900 dark:text-white' 
                            type='email' 
                            autoComplete='off'
                            name='email' 
                            value={data.email}
                            placeholder='Enter Your Email'
                            onChange={(event)=>changeHandler(event)}/>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='dark:text-gray-300'>Password:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500 dark:border-dark-border bg-white dark:bg-dark-bg rounded'>
                            <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-600 dark:placeholder:text-gray-500 text-gray-900 dark:text-white' 
                                type={showpassword?"text":"password"} 
                                autoComplete='off'
                                name='password' 
                                value={data.password}
                                placeholder='Enter Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer dark:text-gray-300' onClick={()=>setshowpassword(!showpassword)}>
                                {
                                    showpassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                        <Link className='flex flex-row-reverse hover:underline hover:text-primary-600 dark:hover:text-primary-400 text-primary-600 dark:text-primary-400 text-sm' to="/forgot-password">Forgot Password</Link>
                    </div>
                    
                    <button className='px-4 py-2 rounded-xl bg-blue-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 transition-all duration-100 text-lg text-bold text-white'>Login</button>
                </form>
                <p className='text-sm px-10 dark:text-gray-400'>Dont't have account ? <Link to="/sign-up" className='hover:underline text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500'>SignUp</Link></p>
            </div>
    </section>
  )
}

