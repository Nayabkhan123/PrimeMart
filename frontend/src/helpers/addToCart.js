import SummaryApi from "../common"
import {toast} from "react-toastify"
const addToCart = async(e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()
    try{
        const apiresponse = await fetch(SummaryApi.addToCartProduct.url,{
            method:SummaryApi.addToCartProduct.method,
            headers:{
                "content-type":"application/json"
            },
            credentials: `include`,
            body: JSON.stringify({
                productId : id,
            })
        })
        const apidata = await apiresponse.json()
        if(apidata.success){
            toast.success(apidata.message)
        }
        if(apidata.error){
            toast.error(apidata.message)
        }
        return apidata;
    }
    catch(err){
        console.log("Error while adding item in cart")
    }
}

export default addToCart