import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const BannerProduct = () => {
    const [currentImage,setCurrImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]
    const nextImage = ()=>{
        if(desktopImages.length-1 > currentImage )
            setCurrImage(currentImage+1)
        else setCurrImage(0);
    }
    
    const prevImage = ()=>{
        if(currentImage != 0)
            setCurrImage(currentImage-1)
        else setCurrImage(desktopImages.length-1);
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log(currentImage)
                nextImage()
        },5000)
        return ()=> clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded overflow-hidden'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 w-full h-full justify-between text-2xl items-center hidden md:flex'>
                <button onClick={prevImage} className='bg-white rounded-full shadow-md p-2'><FaAngleLeft/></button>
                <button onClick={nextImage} className='bg-white rounded-full shadow-md p-2'><FaAngleRight/></button>
            </div>
            {/* desktop and tablet version */}
            <div className='md:flex hidden w-full h-full overflow-hidden'>
                {
                    desktopImages.map((imageUrl,index)=>{
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl}
                                style={{transform:`translateX(-${currentImage*100}%)`}}>
                                <img src={imageUrl} className='w-full h-full'/>
                            </div>
                        )
                    })
                }
            </div>
            {/* mobile version  */}
            <div className='flex w-full h-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((imageUrl,index)=>{
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl}
                                style={{transform:`translateX(-${currentImage*100}%)`}}>
                                <img src={imageUrl} className='w-full h-full object-cover'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct