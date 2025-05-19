import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setuserDetails } from './store/userSlice';
import { FaBold } from 'react-icons/fa';
function App() {
  const dispatch = useDispatch()
  const [countTotalCartProducts,setCountTotalCartProducts] = useState(0)
  async function fetchUserDetails() {
    try{
        const apiresponse = await fetch(SummaryApi.curruser?.url,{
        method:SummaryApi.curruser?.method,
        credentials:'include',
        })
        const apidata = await apiresponse.json();
        if(apidata.success){
          dispatch(setuserDetails(apidata?.data))
        }
        console.log("data-user",apidata)
    }
    catch(err){
      console.log("fetchUserDetails gives error")
    }
  }
  const fetchUserAddToCart = async()=>{
    try{
      const apiresponse = await fetch(SummaryApi.addToCartProductCount.url,{
        method:SummaryApi.addToCartProductCount.method,
        credentials:`include`
      })
      const apidata = await apiresponse.json()
      setCountTotalCartProducts(apidata?.data?.count)
    }
    catch(err){
      console.log("error while fetching add to cart")
    }
  }
  useEffect(()=>{
    fetchUserDetails()

    fetchUserAddToCart()
  },[])

  return (
    <div className="">
      <Context.Provider value={{
        fetchUserDetails, //user details fetch
        countTotalCartProducts, //current user total count of products in Cart
        fetchUserAddToCart //
      }}>
      <ToastContainer position='bottom-right'/>
      <Header/>
      <main className='min-h-[calc(100vh-120px)] bg-gray-100 mt-16'>
        <Outlet/>
      </main>
      <Footer/>
      </Context.Provider>
    </div>
  );
}

export default App;
