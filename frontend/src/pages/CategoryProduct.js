import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategories from '../helpers/productCategories'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import SummaryApi from '../common'
import VerticalProduct from '../components/VerticalProduct'
import { IoReorderThree } from "react-icons/io5";

const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")
    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(e1=>{
      urlCategoryListObject[e1] = true
    })
    const [sortby,setSortby] = useState("")
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])
    const fetchData = async(req,res)=>{
      try{
        setLoading(true)
        const apiresponse = await fetch(SummaryApi.filterProduct.url,{
          method: SummaryApi.filterProduct.method,
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            category: filterCategoryList
          })
        })
        const apidata = await apiresponse.json()
        setLoading(false)
        setData(apidata?.data || [])
        console.log("apidata",apidata)
      }
      catch(err){
        console.log("error while fetching data in CategoryProduct Page")
      }
    }
    const handleSelectCategory = (e)=>{
      const {name,value,checked} = e.target
      setSelectCategory((prev)=>{
        return {
          ...prev,
          [value]:checked
        }
      })
    }
    console.log("selected category:",selectCategory)

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categorykeyName=>{
        if(selectCategory[categorykeyName]){
          return categorykeyName
        }
        return null
      }).filter(el=>el)
      setFilterCategoryList(arrayOfCategory)
      
      // format for url change 
      const urlFormat = arrayOfCategory.map((e1,index)=>{
        if(arrayOfCategory?.length -1 === index){
          return `category=${e1}`
        }
        else{
          return `category=${e1}&&`
        }
      })
      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])

    const handleChangeSortby = (e)=>{
      const {value} = e.target
      setSortby(value)
      if(value === 'asc'){
        setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      if(value === 'dsc'){
        setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    } 
    useEffect(()=>{

    },[sortby])
    const [filterOption,setFilterOption] = useState(false)
  return (
    <div className='w-full mx-auto p-4'>
      {/* Toggle button for filter */}
      <button 
        onClick={()=>setFilterOption(!filterOption)} 
        className='flex items-center gap-2 mb-4 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all'
      >
        <IoReorderThree size={24} />
        <span className='text-sm font-medium'>{filterOption ? 'Hide Filters' : 'Show Filters'}</span>
      </button>
      <div className='flex gap-4 w-full'>
        
        {/* left side  */}
        { filterOption &&
          <div className='bg-white dark:bg-dark-card h-fit max-h-[calc(100vh-200px)] overflow-y-auto w-[200px] md:w-[300px] flex-shrink-0 p-4 rounded shadow-md dark:shadow-gray-900/50 border dark:border-dark-border sticky top-4'>
            {/* sort by  */}
            <div className='text-lg'>
              <h3 className='text-base uppercase font-medium text-slate-500 dark:text-gray-400 border-b pb-1 border-slate-300 dark:border-dark-border'>Sort by</h3>
              <form className='text-sm md:text-md flex gap-2 flex-col py-2 text-gray-900 dark:text-white'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sort' checked={sortby === 'asc'} value="asc" onChange={(e)=>handleChangeSortby(e)}/>
                  <label htmlFor=''>Price - Low to High</label>
                </div>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sort' checked={sortby === 'dsc'} value={"dsc"} onChange={(e)=>handleChangeSortby(e)}/>
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>
            {/* filter by  */}
            <div className='text-lg'>
              <h3 className='text-base uppercase font-medium text-slate-500 dark:text-gray-400 border-b pb-1 border-slate-300 dark:border-dark-border'>Category</h3>
              <form className='text-sm flex gap-2 flex-col py-2 text-gray-900 dark:text-white'>
                {
                  productCategories?.map((categoryName,index)=>{
                    return (
                      <div className='flex items-center gap-3' key={index}>
                        <input type='checkbox' 
                              name={"category"} 
                              checked={selectCategory[categoryName?.value]}
                              id={categoryName?.value}
                              value={categoryName?.value}
                              onChange={(e)=>handleSelectCategory(e)}
                          />
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>
          </div>
        }   
        {/* right side  */}
        <div className='flex-1 min-w-0'>
          <p className='font-medium text-slate-800 dark:text-white text-lg mb-4'>Search Results : {data?.length}</p>
          {
            data?.length !== 0 && !loading && (
              <VerticalProduct data={data} loading={loading}/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
