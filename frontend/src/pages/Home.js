import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

export const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"mobiles"} heading={"Best Deals on Smartphone"}/>
      <HorizontalCardProduct category={"airpods"} heading={"Airpods Top Deals"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Bestselling Trimmers"}/>
      <VerticalCardProduct category={"camera"} heading={"Trending Cameras"}/>

      {/* <VerticalCardProduct category={"airpods"} heading={"Top's airpods"}/> */}

      {/* <VerticalCardProduct category={"camera"} heading={"Photo"}/> */}

    </div>
  )
}