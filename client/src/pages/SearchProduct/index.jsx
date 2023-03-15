import React, { useEffect, useState } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaTshirt } from 'react-icons/fa';
import {RiMessage3Fill} from "react-icons/ri"
import { ProductService } from '../../services';
import { useAppSelector } from '../../app/hooks';
import Product from '../../components/Product';
import ShopInfo from '../../components/shop/info';
export default function SearchProduct() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const isMall = false;
  const [products, setProducts] = useState([]);
  const lang = useAppSelector(state => state.settings.lang)
  useEffect(()=>{
    (async()=>{
        const response = await ProductService.searchProduct(keyword, lang);
        setProducts(response);
    })()
  },[keyword])
  return (
    <div className="flex h-full">
      <div className="bl-gray-500 flex flex-1  gap-2">
        <FaFilter />
        <span className="font-bold ">Filter</span>
      </div>
      <div className="flex-[5]">
        <div>
          {/* Shop */}
          <p>
            <span>3</span> Shops relate with{' '}
            <span className="italic text-blue-700">'{keyword}'</span>
          </p>
          <ShopInfo/>
        </div>
        <Link
          to={`/search_user?keyword=${keyword}`}
          className="block w-full text-center text-blue-700"
        >
          --- More Shop ---
        </Link>
        <div>
          {/* Products */}
          <p>
            Result for keyword{' '}
            <span className="italic text-blue-700">'{keyword}'</span>
          </p>
          <div className="flex flex-wrap gap-4 my-4">
            {products.map((product, index) => <Product key={index} {...product} perRow={4}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}
