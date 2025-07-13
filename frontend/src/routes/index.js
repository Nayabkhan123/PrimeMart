import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Login } from "../components/Login";
import { Forgotpassword } from "../pages/Forgotpassword";
import { Signup } from "../components/Signup";
import { AdminPanel } from "../pages/AdminPanel";
import { AllUsers } from "../pages/AllUsers";
import { AllProducts } from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchForProduct from "../pages/SearchForProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Order from "../pages/Order";
import { AllOrders } from "../pages/AllOrders";
const router =createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<Forgotpassword/>
            },
            {
                path:"sign-up",
                element:<Signup/>
            },
            {
                path:"product-category",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "cancel",
                element: <Cancel/>
            },
            {
                path: "search",
                element: <SearchForProduct/>
            },
            {
                path: "order",
                element: <Order/>
            },
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path:"all-users",
                        element:<AllUsers/>
                    },
                    {
                        path:"all-products",
                        element:<AllProducts/>
                    },
                    {
                        path:"all-orders",
                        element:<AllOrders/>
                    },
                ]
            }
        ]
    }
])
export default router