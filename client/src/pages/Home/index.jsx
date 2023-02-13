import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Slider from '../../components/Slider';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import HotServices from '../../components/HotServices';
import SuggestProduct from '../../components/SuggestProduct';
import { BASE_URL } from '../../configs';
import axios from 'axios';

export default function Home() {
  const {t} = useTranslation();
  const [slider, setSlider] = useState([]);
  const [banner, setBanner] = useState([]);
  useEffect(()=>{
    (async()=>{
      const s = await axios.get(`${BASE_URL}/home/slider.json`);
      const b = await axios.get(`${BASE_URL}/home/banner.json`);
      setSlider(s.data);
      setBanner(b.data);
    })()
  },[])
  const hotServices = [{
    name: "san sale",
    src: "https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi"
  },{
    name: "Free ship",
    src: "https://cf.shopee.vn/file/c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi"
  },{
    name: "hang quoc te",
    src: "https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi"
  }];
  const category ={
    name: "Men Clothes",
    link: "/category/men-clothes.12",
    src: "https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
  }
  // generate categories with 24 categories

  const categories = Array(15).fill(category);
  const product = {
    name: "Con heo ngu ngoc",
    cate: "1",
    price: "30k",
    sold: 30,
    thumbnail: "https://cf.shopee.vn/file/sg-11134201-22100-aqap5ggz59iv59_tn",
    link: "/product/con-heo-ngu-ngoc.12"
  }
  const products = Array(20).fill(product);
  return (
    <div className="flex flex-col gap-4 pb-8">
      <Slider height={"400px"} width={"100%"} carousel={slider}/>
      <HotServices services={hotServices}/>
      <Category categories={categories}/>
      <Banner height='120px' number={3} banner={banner}/>
      <SuggestProduct products={products}/>
    </div>
  )
}
