import React, { useEffect, useState } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaTshirt } from 'react-icons/fa';
import {RiMessage3Fill} from "react-icons/ri"
import { ProductService } from '../../services';
import { useAppSelector } from '../../app/hooks';
import Product from '../../components/Product';
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
          <div className="flex h-32 w-full cursor-pointer items-center gap-2 rounded-lg p-4 shadow-lg hover:scale-[1.02]">
            {/* Avatar and badge */}
            <div className="relative h-16 w-16 rounded-full border-[0.5px] border-black">
              <img src="https://picsum.photos/80" className="rounded-full" />
              {/* Badge mall */}
              <div className="absolute bottom-0 left-1/2 flex h-4 w-full translate-y-1/3 -translate-x-1/2 items-center justify-center rounded-lg bg-blue-700 px-1">
                <span className="text-[11px] font-bold italic text-white">
                  Shop mall
                </span>
              </div>
            </div>
            {/* Name */}
            <div>
              <p className="text-xl font-semibold">Ao Thun Bay Mau</p>
              <p className="text-sm">@username</p>
              <div className="flex text-xs">
                <span className="text-blue-700">490k</span> Followers{' '}
                <span className="mx-2">|</span>
                <span className="text-blue-700">30</span> Following
              </div>
            </div>
            <div className="ml-auto flex">
              {/* Total products */}
              <div className="px-4 border-x">
                <div className="flex gap-2">
                  <FaTshirt color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">50</span>
                </div>
                <span className="text-sm">Products</span>
              </div>
              {/* Rating */}
              <div className="px-4 border-r">
                <div className="flex gap-2">
                  <FaStar color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">4.5</span>
                </div>
                <span className="text-sm">Rating</span>
              </div>
              {/* Response Rate */}
              <div className="px-4 border-r">
                <div className="flex gap-2">
                  <RiMessage3Fill color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">90%</span>
                </div>
                <span className="text-sm">Response Rate</span>
              </div>
            </div>
          </div>
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
