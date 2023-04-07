import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeItem,
  selectItem,
  updateCartItem,
} from '../../app/slices/cart.slice';
import Price from '../../components/Price';
import Quantity from '../../components/Quantity';
import VietNamCurrency from '../../components/Sign/VietNamCurrency';
import { CartService } from '../../services/cart';
import { parseUrl } from '../../utils';
import { unwrapResult } from '@reduxjs/toolkit';
const imageSize = '80px';
export default function Item({ product, selected }) {
  const [loading, setLoading] = useState(false);
  // const [quantity, setQuantity] = useState(product.quantity);
  const cart = useAppSelector((state) => state.cart.cart);
  // const itemSelected = useAppSelector((state) => state.cart.itemSelected);
  // const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const item = itemSelected.filter((x) => {
  //     return x.product.sku === product.sku;
  //   });
  //   if (item.length > 0) {
  //     setChecked(true);
  //   } else {
  //     setChecked(false);
  //   }
  // }, [itemSelected]);
  const variants = product.productVariantOptions.filter((value) =>
    product.sku
      .split('_')
      .slice(1, 3)
      .find((id) => value._id === +id),
  );
  const image = variants.find((x) => x.image !== '' && x.image !== null).image;
  const onUpdateQuantity = (q) => {
    if (q === null || q === undefined || +q === 0) {
      alert('Please select at least 1 product!!!');
    } else {
      (async () => {
        setLoading(true);
        try {
          const item = cart.find((x) => x.product.sku === product.sku);
          const unwrap = dispatch(
            updateCartItem({
              _id: item._id,
              field: {
                quantity: q,
              },
            }),
          );
          // const result = await unwrapResult(unwrap);
        } catch (error) {}
        setLoading(false);
      })();
    }
  };
  // console.log(product);
  const onSelect = (e) => {
    if (product.selected) {
      dispatch(removeItem(product.sku));
    } else {
      dispatch(selectItem(product.sku));
    }
  };

  return (
    <div className="my-2 flex items-center gap-4 border-b ">
      <div className="flex flex-[5] items-center">
        <input
          type="checkbox"
          className="h-5 w-5"
          checked={product.selected}
          onChange={onSelect}
        />
        <div className="flex items-center justify-between px-4 gap-4">
          <div
            className="rounded-lg bg-no-repeat"
            style={{
              backgroundImage: `url(${parseUrl(image)})`,
              backgroundPosition: '20% 20%',
              backgroundSize: `${imageSize} ${imageSize}`,
              width: imageSize,
              height: imageSize,
            }}
          ></div>
          <p className="w-40 line-clamp-2 ">{product.name}</p>
          <div>
            <button className="flex items-center gap-2">
              Sort <AiFillCaretDown size="16px" />
            </button>
            <p>{variants.map((v) => v.value).join(',')}</p>
          </div>
        </div>
      </div>
      <div className="flex-[1] text-right">
        <Price price={product.price} />
        <VietNamCurrency />
      </div>
      <div className="flex-[2]">
        <Quantity
          isLoading={loading}
          current={product.quantity}
          onChange={onUpdateQuantity}
        />
      </div>
      <div className="flex-[2]">
        <Price price={product.quantity * product.price} />
        <VietNamCurrency />
      </div>
      <div className="">Delete</div>
    </div>
  );
}
