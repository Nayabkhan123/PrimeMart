import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalProduct from '../components/VerticalProduct'

const SearchForProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    console.log("params",query.search)
    const fetchProduct = async()=>{
        try{
            setLoading(true)
            const apiresponse = await fetch(SummaryApi.searchProduct.url+query.search)
            const apidata = await apiresponse.json()
            setLoading(false)
            setData(apidata.data)
        }
        catch(err){
            console.log(err)
            console.log("error while fetching seach product")
        }
    }
    useEffect(()=>{
        fetchProduct()
    },[query])
    return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <div className='flex items-center justify-center'>
                    <span className='loader'></span>
                </div>
            )
        }
        <p className='text-lg font-semibold my-3'>Search Results : {data?.length}</p>
        {
            data?.length === 0 && !loading && (
                 <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
            )
        }
        {
            data?.length !== 0 && !loading && (
                <VerticalProduct loading={loading} data={data}/>
            )
        }
    </div>
  )
}

export default SearchForProduct