const express = require('express')
const router = express.Router()

const userSignupController = require('../controllers/signup');
const userLoginController = require('../controllers/login');
const authToken = require('../middleware/authtoken');
const userDetails = require('../controllers/userDetails');
const userLogoutController = require('../controllers/logout');
const allUsers = require('../controllers/allUsers');
const updateUserRole = require('../controllers/updateUserRole');
const uploadProductController = require('../controllers/uploadProduct');
const getAllProducts = require('../controllers/getAllProducts');
const updateProductController = require('../controllers/updateProduct');
const getCategoryProduct = require('../controllers/product/getCategoryProduct');
const getCategoryWiseProducts = require('../controllers/product/getCategoryWiseProducts');
const getProductDetails = require('../controllers/product/getProductDetails');
const addToCartController = require('../controllers/user/addToCartController');
const countAddToCartProduct = require('../controllers/user/countAddToCartProduct');
const addToCartViewProduct = require('../controllers/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controllers/user/updateAddToCartProduct');
const removeProductFromCart = require('../controllers/user/removeProductFromCart');
const seachProduct = require('../controllers/product/searchProduct');
const filterProduct = require('../controllers/product/filterProduct');
const paymentController = require('../controllers/order/paymentController');
const webhooks = require('../controllers/order/webHook');
const orderController = require('../controllers/order/orderController');

router.post("/signup",userSignupController)
router.post("/login",userLoginController)
router.get("/user-details",authToken,userDetails)
router.get("/logout",userLogoutController)

//admin panel
router.get("/all-users",authToken,allUsers)
router.post("/update-user-role",authToken,updateUserRole)

//Upload Product 
router.post("/upload-product",authToken,uploadProductController)
router.get("/get-all-products",getAllProducts)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)

router.post("/category-product",getCategoryWiseProducts)
router.post("/product-details",getProductDetails)
router.get("/search",seachProduct)
router.post('/filter-product',filterProduct)

// user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)

router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/remove-product-from-cart",authToken,removeProductFromCart)



//payment and order
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhooks)
router.get("/order-list",authToken,orderController)
module.exports = router