import pako from 'pako';

const compressBase64 = (base64String) => {
  const binaryData = Uint8Array.from(atob(base64String.split(',')[1]), (c) => c.charCodeAt(0));
  const compressed = pako.deflate(binaryData, { level: 9 });
  const compressedString = Array.from(compressed).map(byte => String.fromCharCode(byte)).join('');
  console.log("file url",compressedString)

  return btoa(compressedString);
};


const imageTobase64=async (image)=>{
    const reader=new FileReader();
    reader.readAsDataURL(image)
    const data= await new Promise((resolve,reject)=>{
        reader.onload=()=>{
              console.log("file url",reader.result)

          resolve(reader.result)
        }

        reader.onerror=error=>reject(error)
    })
    return data
    // return compressBase64(data)
}
export default imageTobase64