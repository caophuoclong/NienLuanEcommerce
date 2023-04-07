import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  emptySelected,
  selectAllItem,
} from '../../app/slices/cart.slice';
import Item from './Item';
import Shop from './Shop';
import LoadingSkeleton from './LoadingSkeleton';
import ItemSelected from './ItemSelected';

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartShop, setCartShop] = useState({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cart.length > 0) {
      const tmp = {};
      cart.forEach((cartItem)=>{
        const {product, quantity, selected} = cartItem;
        const {shop, ...temp} = product;
        if(!tmp[shop._id]){
          tmp[shop._id] = {
            shopInfo: shop,
            products: [{
              ...temp,
              quantity: quantity,
              selected: selected,
            }]
          }
        }else{
          const pr = tmp[shop._id].products;
          const isExist = pr.find(x=>x.sku === product.sku);
          if(!isExist){
            pr.push({
              ...temp,
              quantity: quantity,
              selected: selected,
            })
          }
          tmp[shop._id].products = pr;
        }
      })
      setCartShop(tmp)
    }
  }, [cart]);
  // useEffect(() => {
  //   console.log(cartShop);
  // }, [cartShop]);
  const handleSelectAll = () => {
    if (cart.every(x => x.selected)) {
      dispatch(emptySelected());
    } else {
      dispatch(selectAllItem());
    }
  };

  return (
    <div className="mt-3">
      <Link to="/" className="text-blue-500">
        Trang chủ
      </Link>
      {' > '}
      <Link to="'/Cart'" className="text-blue-500">
        Giỏ Hàng
      </Link>
      <h1 className="text-xl font-bold">Cart</h1>
      {cart.length > 0 ? (
        <React.Fragment>
          {/* Heading */}
          <div className="flex items-center gap-4 rounded-md bg-white p-1 px-2">
            <input
              checked={
                cart.every(x => x.selected)
              }
              onChange={handleSelectAll}
              type="checkbox"
              className="h-5 w-5"
            />
            <div className="flex-[5]">All {cart.length} products</div>
            <div className="flex-[1]">UnitPrice</div>
            <div className="flex-[2]">Quantity</div>
            <div className="flex-[2]">TotalPrice</div>
            <button>
              <BiTrash size="24px" />
            </button>
          </div>
          {/* Body */}
          <div>
            {Object.keys(cartShop).map((key) => {
              if (key)
                return (
                  <Shop key={key} shopInfo={cartShop[key].shopInfo}>
                    {cartShop[key].products.map((product) => (
                      <Item key={product.sku} product={product} />
                    ))}
                  </Shop>
                );
              else return <LoadingSkeleton />;
            })}
          </div>
          <ItemSelected />
        </React.Fragment>
      ) : (
        <div>Please buy goods</div>
      )}
    </div>
  );
}
