import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Item from './Item';
import Price from '../../../components/Price';
import VietNamCurrency from '../../../components/Sign/VietNamCurrency';
import { useEffect } from 'react';

export default function OrderSummary() {
  const cart = useAppSelector((state) => state.cart.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(25000);

  useEffect(() => {
    const newPrice = cart.filter(item => item.selected).reduce((prev, current) => {
      return prev + (current.quantity * current.product.price);
    }, 0);
    setSubTotal(newPrice);
  }, [cart]);
  return (
    <React.Fragment>
      <div className="text-xl font-bold">
        Order Summary{' '}
        <span className="text-sm text-gray-400">
          {cart.filter(x => x.selected).length} items
        </span>
      </div>
      <div className="mt-2 flex h-[80%] flex-col gap-2 overflow-y-auto">
        {cart.filter(item => item.selected).map((item) => (
          <Item key={item._id} {...item} />
        ))}
      </div>
      <p className="text-xl font-bold">Enter coupon</p>
      <div className="w-full border">
        <input
          type="text"
          className="w-[90%] border-none p-0 px-2 text-lg
        outline-none
        focus:outline-none
        focus:ring-0
        active:outline-none
        "
        />
        <button className="w-[10%] bg-blue-400 p-2 font-semibold text-white">
          Apply
        </button>
      </div>
      <div className="flex items-center justify-between px-2">
        <span className="text-md text-gray-400">Subtotal: </span>
        <span className="font-bold">
          <Price price={subTotal} />
          <VietNamCurrency />
        </span>
      </div>
      <div className="flex items-center justify-between px-2">
        <span className="text-md text-gray-400">Shipping: </span>
        <span className="font-bold">
          <Price price={25000} />
          <VietNamCurrency />
        </span>
      </div>
      <div className="flex items-center justify-between px-2">
        <span className="text-md text-gray-400">Total: </span>
        <span className="font-bold">
          <Price price={shipping + subTotal} />
          <VietNamCurrency />
        </span>
      </div>
    </React.Fragment>
  );
}
