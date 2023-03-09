import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import { Carousel } from 'react-responsive-carousel';
export default function Product(props) {
  const refAddToCart = useRef(null);
  const refFavorite = useRef(null);
  const refProduct = useRef(null);
  const refFeatures = useRef(null);
  const loggedIn = useAppSelector((state) => state.home.loggedIn);
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
  useEffect(() => {
    const product = refProduct.current;
    const features = refFeatures.current;
    if (product !== null && features !== null) {
      product.addEventListener('mouseover', () => {
        features.classList.remove('invisible');
      });
      product.addEventListener('mouseout', () => {
        features.classList.add('invisible');
      });
    }
  }, [refProduct, refFeatures]);
  const isLoggedIn = () => {
    console.log(loggedIn);
    if (!loggedIn) {
      alert('Please login to continue');
      navigate('/signin');
    }
  };
  const onAddToCartClick = (e) => {
    e.preventDefault();
    isLoggedIn();
  };
  const onFavoriteClick = (e) => {
    e.preventDefault();
    isLoggedIn();
  };
  const min = 1000;
  const max = 1500;
  return (
    <Link
      to={`/product/${props.name}.${props._id}`}
      style={{
        width: `calc(100% / ${props.perRow} - 1rem)`,
        height: "300px"
      }}
      ref={refProduct}
      className="box-border rounded-md rounded-b-none border-red-500 bg-white pb-2  hover:scale-105 hover:border"
    >
      {/* <img
        src={thumbnail}
        className="rounded-md"
        alt=""
        style={{
          width: '100%',
          height: '80%',
        }}
      /> */}
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay
        duration={Math.floor(Math.random() * (max - min + 1)) + min}
        infiniteLoop
        width={'100%'}
      >
        {[props.meta[0]]
          .map((i) => i.images)
          .map((imgg, i) => (
            <img
              src={imgg}
              key={i}
              className="rounded-md"
              alt=""
              style={{
                width: '100%',
                height: '200px',
              }}
            />
          ))}
      </Carousel>
      <div className="px-2">
        <div>{props.name}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-red-500">
            <div className=" text-xs font-bold">₫</div>
            {`
              ${Math.min(...props.meta.map(m => m.price))}
              -
              ${Math.max(...props.meta.map(m => m.price))}

              `}
          </div>
          <div className="flex gap-x-1 text-sm text-gray-500">
            <span>Sold</span>
            {props.meta.reduce((acc, cur) => acc + cur.sold, 0)}
          </div>
        </div>
      </div>
      <div
        ref={refFeatures}
        className="invisible absolute bottom-0 z-10 flex h-10 w-full translate-y-full scale-[1.01] rounded-b-md border border-red-500 bg-white"
      >
        <button
          ref={refFavorite}
          onClick={onFavoriteClick}
          className="group flex flex-1 items-center justify-center gap-x-2 border-r border-black bg-red-500 text-white"
        >
          <AiOutlineStar size={24} color={'white'} />
          <p className="hidden font-bold group-hover:block">Add to favorite</p>
        </button>
        <button
          ref={refAddToCart}
          onClick={onAddToCartClick}
          className="group flex flex-1 items-center  justify-center gap-x-2 border-black bg-red-500 text-white "
        >
          <MdOutlineAddShoppingCart size={24} color={'white'} />
          <p className="hidden font-bold group-hover:block">Add to cart</p>
        </button>
      </div>
    </Link>
  );
}
