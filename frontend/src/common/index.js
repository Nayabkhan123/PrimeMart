const backendDomain = "http://localhost:8080/api";
// const backendDomain = "http://192.168.66.54:8080/api";
// const backendDomain = "https://eb35-2409-40d0-2009-7978-89b2-eca3-be96-313a.ngrok-free.app/api";


const SummaryApi = {
    signup: {
        url: `${backendDomain}/signup`,
        method: "post",
    },
    login: {
        url: `${backendDomain}/login`,
        method: "post"
    },
    curruser:{
        url: `${backendDomain}/user-details`,
        method: "get"
    },
    logout:{
        url:`${backendDomain}/logout`,
        method:"get"
    },
    allusers:{
        url:`${backendDomain}/all-users`,
        method:"get"
    },
    updateUserRole:{
        url:`${backendDomain}/update-user-role`,
        method:"post"
    },
    uploadProduct:{
        url:`${backendDomain}/upload-product`,
        method:"post"
    },
    getAllProducts:{
        url:`${backendDomain}/get-all-products`,
        method:"get"
    },
    updateProduct:{
        url:`${backendDomain}/update-product`,
        method:"post"
    },
    categoryProduct:{
        url:`${backendDomain}/get-categoryProduct`,
        method:"get"
    },
    categoryWiseProduct:{
        url:`${backendDomain}/category-product`,
        method:"post"   
    },
    productDetails:{
        url:`${backendDomain}/product-details`,
        method:"post"
    },
    addToCartProduct:{
        url:`${backendDomain}/addtocart`,
        method:"post"
    },
    addToCartProductCount:{
        url:`${backendDomain}/countAddToCartProduct`,
        method:"get"
    },
    addToCartProductView:{
        url:`${backendDomain}/view-cart-product`,
        method:"get"
    },
    updateCartProduct:{
        url:`${backendDomain}/update-cart-product`,
        method:"post"
    },
    removeProductCart:{
        url:`${backendDomain}/remove-product-from-cart`,
        method:"post"
    },
    searchProduct:{
        url:`${backendDomain}/search`,
        method:"get"
    },
    filterProduct:{
        url:`${backendDomain}/filter-product`,
        method:"post"
    },
    payment: {
        url:`${backendDomain}/checkout`,
        method:"post"
    },
    getOrder:{
        url:`${backendDomain}/order-list`,
        method:"get"
    }

}

export default SummaryApi