import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeItem, selectItem } from '../../app/slices/cart.slice';
import Price from '../../components/Price';
import Quantity from '../../components/Quantity';
import VietNamCurrency from '../../components/Sign/VietNamCurrency';
import { CartService } from '../../services/cart';
import { parseUrl } from '../../utils';
const imageSize = '80px';
export default function Item({ product }) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);
  const cart = useAppSelector((state) => state.cart.cart);
  const itemSelected = useAppSelector((state) => state.cart.itemSelected);
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const item = itemSelected.filter((x) => {
      return x.product.sku === product.sku;
    });
    if (item.length > 0) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [itemSelected]);
  const variants = product.productVariantOptions.filter((value) =>
    product.sku
      .split('_')
      .slice(1, 3)
      .find((id) => value._id === +id),
  );
  const image = variants.find((x) => x.image !== '' && x.image !== null).image;
  const onUpdateQuantity = (q) => {
    if (q === null || q === undefined || +q === 0) {
      setQuantity(product.quantity);
      alert('Please select at least 1 product!!!');
    } else {
      (async () => {
        setLoading(true);
        try {
          const item = cart.find((x) => x.product.sku === product.sku);
          const response = await CartService.update(item._id, {
            quantity: q,
          });
          setQuantity(q);
          
        } catch (error) {

        }
        setLoading(false);
      })();
    }
  };
  const onSelect = (e) => {
    const cartItem = cart.find((item) => item.product.sku === product.sku);
    if (checked) {
      dispatch(removeItem(cartItem));
    } else {
      dispatch(selectItem(cartItem));
    }
  };

  return (
    <div className="my-2 flex items-center gap-4 border-b ">
      <div className="flex flex-[5] items-center justify-between">
        <input
          type="checkbox"
          className="h-5 w-5"
          checked={checked}
          onChange={onSelect}
        />
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
        <p className="w-40 self-start line-clamp-2 ">{product.name}</p>
        <div>
          <button className="flex items-center gap-2">
            Sort <AiFillCaretDown size="16px" />
          </button>
          <p>{variants.map((v) => v.value).join(',')}</p>
        </div>
      </div>
      <div className="flex-[1] text-right">
        <Price price={product.price} />
        <VietNamCurrency />
      </div>
      <div className="flex-[2]">
        <Quantity
          isLoading={loading}
          current={quantity}
          onChange={onUpdateQuantity}
        />
      </div>
      <div className="flex-[2]">
        <Price price={quantity * product.price} />
        <VietNamCurrency />
      </div>
      <div className="">Delete</div>
    </div>
  );
}
