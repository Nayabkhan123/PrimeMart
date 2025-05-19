import React, { useState } from 'react'
import { GrClose } from "react-icons/gr";
import productCategories from '../helpers/productCategories';
import { GrCloudUpload } from "react-icons/gr";
import { uploadImage } from '../helpers/uploadImage';
import DisplayProductImage from './DisplayProductImage';
import { TiDelete } from "react-icons/ti";
import SummaryApi from '../common';
import {toast} from 'react-toastify'

export const UploadProduct = ({onclose,fetchAllProduct}) => {
    const [openZoomProductImage,setOpenZoomProductImage] = useState(false);
    const [fullScreenImage,setFullScreenImage] = useState("")
    const [data,setdata] = useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:[],
        description:"",
        price:"",
        sellingPrice:"",
    })
    function changeHandler(e){
        const {name,value} = e.target
        setdata((prev)=>{
            return {
                ...prev,[name]:value
            }
        })
    }
    async function handleDeleteProduct(index){
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1);
        setdata((prev)=>{
            return {
                ...prev,
                productImage:[...newProductImage]
            }
        })
    }
    async function changeUploadHandler(e){
        const file = e.target.files;
        if(file.length){
            const uploadImageCloudinary = await uploadImage(file[0])
            setdata((prev)=>{
                return{
                    ...prev,
                    productImage: [...prev.productImage ,uploadImageCloudinary?.url]
                }
            })
            console.log("upload image " , uploadImageCloudinary)
        }
    }

    // submit Handler
    async function submitHandler(e){
        e.preventDefault();
        const apiresponse = await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const apidata = await apiresponse.json()
        if(apidata.success){
            toast.success(apidata?.message)
            onclose();
            fetchAllProduct();
        }
        if(apidata.error){
            toast.error(apidata?.message)
        }
        console.log("data",data)
    }
  return (
    <div className='fixed h-full w-full top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-opacity-45 bg-slate-200 '>
        <div className='overflow-y-hidden bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] shadow-lg'>
            <div className='flex pb-4 justify-between items-center w-full'>
                <h2 className='font-bold text-lg '>Upload Product</h2>
                <div className='text-lg hover:scale-125 transition-all duration-100 cursor-pointer' onClick={onclose}>
                    <GrClose/>
                </div>
            </div>
            <form className='grid h-full p-4 gap-3 overflow-y-scroll pb-14'
                onSubmit={submitHandler}>
                <label htmlFor='productName'>Product Name</label>
                <input type='text' 
                required
                id="productName" 
                name='productName'
                placeholder='Enter Product Name' 
                value={data.productName}
                onChange={changeHandler}
                className='p-2 bg-slate-100 border rounded'/>

                <label htmlFor='brandName'>Brand Name</label>
                <input type='text'
                required 
                id="brandName" 
                name='brandName'
                placeholder='Enter Brand Name' 
                value={data.brandName}
                onChange={changeHandler}
                className='p-2 bg-slate-100 border rounded'/>

                <label htmlFor='category'>Category</label>
                <select value={data.category} className='p-2 bg-slate-100 border rounded'
                    onChange={changeHandler}
                    name="category"
                    id='category'
                    required>
                    <option value={""}>Select Category</option>

                    {
                        productCategories.map((el,index)=>{
                            return(
                                <option value={el.value} key={el.index}>{el.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor='productImage'>Product image</label>
                <div className='w-full h-32 bg-slate-200 flex justify-center items-center rounded border '>
                    <label htmlFor='uploadImageInput'>
                        <div className='text-slate-500 cursor-pointer gap-2 flex justify-center items-center flex-col'>
                            <span className='text-4xl'><GrCloudUpload/></span>
                            <p className='text-sm font-semibold'>Upload Product Image</p>
                            <input id='uploadImageInput'
                                    type='file'
                                    className='hidden'
                                    onChange={changeUploadHandler}/>
                        </div>
                    </label>
                </div>
                <div className='w-full'>
                    <div className='flex gap-2 overflow-x-auto flex-wrap'>
                        {
                            data?.productImage[0] ? (
                                data.productImage.map((el,index)=>(
                                    
                                    <div className='relative group cursor-pointer'>
                                        <img src={el} 
                                        alt='el' 
                                        className='bg-slate-100 border max-h-32 max-w-32' 
                                        onClick={()=>{
                                            setOpenZoomProductImage(true)
                                            setFullScreenImage(el)
                                        }}
                                        />
                                        <div className='absolute top-0 right-0 text-3xl text-red-600 p-1 hover:scale-110 transition-all cursor-pointer hidden group-hover:block'
                                            onClick={()=>handleDeleteProduct(index)}>
                                            <TiDelete/>
                                        </div>
                                    </div>
                                ))
                            ):
                            (<p className='text-sm text-blue-600 '>*Please Upload product image</p>)
                        }
                    </div>
                </div>
                <label htmlFor='price'>Price</label>
                <input type='number' 
                    required
                    id="price" 
                    name='price'
                    placeholder='Enter Price' 
                    value={data.price}
                    onChange={changeHandler}
                    className='p-2 bg-slate-100 border rounded'/>
                
                <label htmlFor='sellingPrice'>Selling Price</label>
                <input type='number' 
                    required
                    id="sellingPrice" 
                    name='sellingPrice'
                    placeholder='Enter Selling Price' 
                    value={data.sellingPrice}
                    onChange={changeHandler}
                    className='p-2 bg-slate-100 border rounded'/>

                <label htmlFor='description'>Description</label>
                <textarea name='description' className='h-32 p-2 bg-slate-100 rounded resize-none' 
                    rows={3}
                    required
                    onChange={changeHandler}
                    placeholder='Enter Product Description'
                    value={data.description}>

                </textarea>
                        
                <button className='px-3 py-2 bg-blue-500 rounded text-white hover:bg-blue-700'>Upload Product</button>
            </form>
        </div>
        {
            openZoomProductImage &&
            <DisplayProductImage 
                onClose={()=>setOpenZoomProductImage(false)}
                imageUrl = {fullScreenImage}
            />
        }
    </div>
  )
}
