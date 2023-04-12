import React, { useEffect, useState } from 'react';
import BadgeShopMall from '../../components/shop/BadgeShopMall';

import { AiOutlineShop } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeItem,
  removeProductShop,
  selectAllProductShop,
  selectItem,
} from '../../app/slices/cart.slice';
export default function Shop({ shopInfo, children }) {
  const cart = useAppSelector((state) => state.cart.cart);
  const itemSelected = useAppSelector((state) => state.cart.itemSelected);
  const dispatch = useAppDispatch();
  const checked = cart
    .filter((item) => item.product.shop._id === shopInfo._id)
    .every((item) => item.selected);
  const handleSelectAllProducts = (e) => {
    if (!checked) {
      dispatch(selectAllProductShop(shopInfo._id));
    } else {
      dispatch(removeProductShop(shopInfo._id));
    }
  };

  return (
    <div className="my-2 rounded-md bg-white p-2 shadow-lg">
      <div className="text-md flex items-center gap-2">
        <input
          checked={checked}
          onChange={handleSelectAllProducts}
          width="1rem"
          height="1rem"
          className="h-5 w-5 border-white "
          id="selectAll"
          type="checkbox"
        />
        <div className="w-16">
          {1 ? <BadgeShopMall absolute={false} /> : <AiOutlineShop />}
        </div>
        <label htmlFor="selectedAll">{shopInfo.shop_name}</label>
      </div>
      {children}
    </div>
  );
}
