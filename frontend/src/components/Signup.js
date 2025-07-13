import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../assest/loginIcon.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import registerImage from '../assest/register.jpg'
import { uploadImage } from '../helpers/uploadImage';
export const Signup = () => {
    const Navigate = useNavigate();
        const [showPassword,setshowPassword] =useState(true);
        const [showConfirmPassword,setShowConfirmPassword] =useState(true);
        const [data,setData] = useState({
            email:"",
            password:"",
            name:"",
            confirmPassword:"",
            profilePic:""
        })
        function changeHandler(e){
            const {name,value}=e.target;
            setData((prev)=>{
                return {
                    ...prev,[name]:value
                }
            })
        }
        async function uploadHandler(e){
            const file=e.target.files[0];

            const uploadImageCloudinary = await uploadImage(file)
            // setData((prev)=>{
            //     return{
            //         ...prev,
            //         productImage: [...prev.productImage ,uploadImageCloudinary?.url]
            //     }
            // })
            console.log("upload image " , uploadImageCloudinary)
                  

            // const profilepicurl =await imageTobase64(file)
            setData((prev)=>{
                return{
                    ...prev,
                    profilePic:uploadImageCloudinary?.url
                }
            })
            console.log(file)
        }
        async function submitHandler(e){
            e.preventDefault();
            if(data.password===data.confirmPassword){
                const dataResponse = await fetch(SummaryApi.signup.url,{
                    method : SummaryApi.signup.method,
                    headers:{
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                })
                const apidata= await dataResponse.json()
                console.log(apidata)
                if(apidata.success){
                    toast.success(apidata.message)
                    Navigate('/login')
                }
                if(apidata.error){
                    toast.error(apidata.message)
                }
                
                console.log("data :", apidata)
            }
            else{
                console.log("Please check password and confirm password")
            }
            
        }
        console.log(data);
  return (
    <section id='signup' 
    className="relative flex items-center justify-end min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${registerImage})` }}>
            <div className='bg-transparent w-full max-w-lg flex flex-col py-6 rounded-2xl border-[1px] border-black mr-12'>
                <div className='h-fit mx-auto relative'>

                    <div className='my-2'>
                        <label className=' flex items-center justify-center flex-col'>
                            <img className={`${!data?.profilePic ? 'animate-bounce h-44 w-44' : 'h-32 w-32' } rounded-full object-cover`} src={data.profilePic || loginIcon} />

                            <div className='bg-slate-50 p-1 shadow-lg text-center text-[13px] opacity-60 hover:opacity-90 cursor-pointer transition-all rounded-full'>
                                {data?.profilePic ? ("Update Image") : ("Upload Image")}
                            </div>
                            <input type='file' className='hidden' onChange={(e)=>uploadHandler(e)}/>
                        </label>
                    </div>
                    
                </div>
                <form className='grid px-10 gap-2 text-lg' onSubmit={(event)=>submitHandler(event)}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500'>
                            <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-600' 
                            type='text' 
                            name='name' 
                            value={data.name}
                            required
                            placeholder='Enter Your Name'
                            onChange={(event)=>changeHandler(event)}/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='email'>Email:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500'>
                            <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-600' 
                            type='email' 
                            name='email' 
                            value={data.email}
                            required
                            placeholder='Enter Your Email'
                            onChange={(event)=>changeHandler(event)}/>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500'>
                            <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-600' 
                                type={showPassword?"text":"password"} 
                                name='password' 
                                value={data.password}
                                required
                                placeholder='Enter Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer' onClick={()=>setshowPassword(!showPassword)}>
                                {
                                    showPassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500'>
                            <input className='w-full h-full bg-transparent outline-none placeholder:text-slate-600' 
                                type={showConfirmPassword?"text":"password"} 
                                name='confirmPassword' 
                                value={data.confirmPassword}
                                required
                                placeholder='Confirm Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showConfirmPassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                    </div>
                    
                    <button className='px-4 py-2 rounded-xl bg-red-400 hover:bg-red-500 transition-all duration-100 text-lg text-bold'>SignUp</button>
                </form>
                <p className='text-sm px-10'>Already have account ? <Link to="/login" className='hover:underline text-red-500 hover:text-red-600'>Login</Link></p>
            </div>
    </section>
  )
}
