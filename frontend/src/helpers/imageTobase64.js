import pako from 'pako';

const compressBase64 = (base64String) => {
  const binaryData = Uint8Array.from(atob(base64String.split(',')[1]), (c) => c.charCodeAt(0));
  const compressed = pako.deflate(binaryData, { level: 9 });
  return btoa(String.fromCharCode(...compressed));
};


const imageTobase64=async (image)=>{
    const reader=new FileReader();
    reader.readAsDataURL(image)
    
    const data= await new Promise((resolve,reject)=>{
        reader.onload=()=>resolve(reader.result)

        reader.onerror=error=>reject(error)
    })
    // return data
    return compressBase64(data)
}
export default imageTobase64