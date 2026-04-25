import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState, useCallback, useMemo } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setuserDetails } from './store/userSlice';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [countTotalCartProducts, setCountTotalCartProducts] = useState(0)

  const hideFooter = useMemo(() => 
    ['/login', '/sign-up', '/admin-panel/all-products', '/admin-panel/all-users', '/cart'].includes(location.pathname),
    [location.pathname]
  )
  
  const hideNavBar = useMemo(() => 
    ['/login', '/sign-up'].includes(location.pathname),
    [location.pathname]
  )

  const fetchUserDetails = useCallback(async() => {
    try{
        const apiresponse = await fetch(SummaryApi.curruser?.url, {
          method: SummaryApi.curruser?.method,
          credentials: 'include',
        })
        const apidata = await apiresponse.json();
        if(apidata.success){
          dispatch(setuserDetails(apidata?.data))
        }
    }
    catch(err){
      console.log("fetchUserDetails gives error", err)
    }
  }, [dispatch])

  const fetchUserAddToCart = useCallback(async() => {
    try{
      const apiresponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      })
      const apidata = await apiresponse.json()
      if (apidata.success) {
        setCountTotalCartProducts(apidata.data.count);
      } else {
        setCountTotalCartProducts(0);
      }
    }
    catch(err){
      console.log("error while fetching add to cart")
    }
  }, [])

  useEffect(() => {
    fetchUserDetails()
    fetchUserAddToCart()
  }, [fetchUserDetails, fetchUserAddToCart])

  const contextValue = useMemo(() => ({
    fetchUserDetails,
    countTotalCartProducts,
    fetchUserAddToCart
  }), [fetchUserDetails, countTotalCartProducts, fetchUserAddToCart])

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-200">
        <Context.Provider value={contextValue}>
          <ToastContainer 
            position='bottom-right'
            theme="colored"
            autoClose={3000}
          />
          {!hideNavBar && <div className='mt-16'><Header/></div>}
          <main className='min-h-[calc(100vh-120px)] bg-gray-50 dark:bg-dark-bg transition-colors duration-200'>
            <Outlet/>
          </main>
          {!hideFooter && <Footer/>}
        </Context.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;

