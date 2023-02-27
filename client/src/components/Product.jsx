import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { useRef } from 'react';
import {useAppSelector} from "../app/hooks";
export default function Product({
  link,
  thumbnail,
  name,
  price,
  sold,
  perRow = 6,
}) {
  const refAddToCart = useRef(null);
  const refFavorite = useRef(null);
  const refProduct = useRef(null);
  const refFeatures = useRef(null);
  const loggedIn = useAppSelector((state)=> state.home.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (refAddToCart.current !== null && refFavorite.current !== null) {
      const addToCart = refAddToCart.current;
      const favorite = refFavorite.current;
      addToCart.addEventListener('mouseover', () => {
        favorite.style.flex = '0';
      });
      addToCart.addEventListener('mouseout', () => {
        favorite.style.flex = '1';
      });
      favorite.addEventListener('mouseover', () => {
        addToCart.style.flex = '0';
      });
      favorite.addEventListener('mouseout', () => {
        addToCart.style.flex = '1';
      });
    }
  }, [refAddToCart, refFavorite]);
  useEffect(()=>{
    const product = refProduct.current;
    const features = refFeatures.current;
    if(product !== null && features !== null){
      product.addEventListener('mouseover',()=>{
        features.classList.remove('invisible');
      })
      product.addEventListener('mouseout',()=>{
        features.classList.add('invisible');
      })

    }
  },[refProduct,refFeatures])
  const isLoggedIn = ()=>{
    console.log(loggedIn);
    if(!loggedIn){
      alert('Please login to continue');  
      navigate("/signin")

    }
  }
  const onAddToCartClick = (e) => {
    e.preventDefault();
    isLoggedIn();
  };
  const onFavoriteClick = (e) => {
    e.preventDefault();
    isLoggedIn();

  };
  return (
    <Link
      to={link}
      style={{
        width: `calc(100% / ${perRow} - 1rem)`,
      }}
      ref={refProduct}
      className="box-border rounded-md rounded-b-none border-red-500 bg-white pb-2  hover:scale-105 hover:border"
    >
      <img
        src={thumbnail}
        className="rounded-md"
        alt=""
        style={{
          width: '100%',
          height: '80%',
        }}
      />
      <div className="px-2">
        <div>{name}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-red-500">
            <div className=" text-xs font-bold">₫</div>
            {price}
          </div>
          <div className="flex gap-x-1 text-sm text-gray-500">
            <span>Sold</span>
            {sold}
          </div>
        </div>
      </div>
      <div ref={refFeatures} className="absolute bottom-0 z-10 h-10 w-full translate-y-full scale-[1.01] rounded-b-md border border-red-500 bg-white invisible flex">
        <button
          ref={refFavorite}
          onClick={onFavoriteClick}
          className="text-white flex flex-1 items-center justify-center border-r border-black bg-red-500 group gap-x-2"
        >
          <AiOutlineStar size={24} color={'white'} />
          <p className="hidden group-hover:block font-bold">Add to favorite</p>
        </button>
        <button
          ref={refAddToCart}
          onClick={onAddToCartClick}
          className="text-white flex flex-1 items-center  justify-center border-black bg-red-500 group gap-x-2 "
        >
          <MdOutlineAddShoppingCart size={24} color={'white'} />
          <p className='hidden group-hover:block font-bold'>Add to cart</p>
        </button>
      </div>
    </Link>
  );
}
