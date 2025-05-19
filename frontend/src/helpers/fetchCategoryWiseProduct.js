const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    try{
        const apiresponse = await fetch(SummaryApi.categoryWiseProduct.url,{
            method: SummaryApi.categoryWiseProduct.method,
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                category:category
            })
        })
        const apidata = await apiresponse.json()
        console.log("horizontal" ,apidata)
        return apidata
    }
    catch(err){
        console.log("Error while fetching CategoryWiseProduct")
    }
}
export default fetchCategoryWiseProduct;