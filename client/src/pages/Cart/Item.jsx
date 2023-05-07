import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteProductItem,
  removeItem,
  selectItem,
  updateCartItem,
} from '../../app/slices/cart.slice';
import Price from '../../components/Price';
import Quantity from '../../components/Quantity';
import VietNamCurrency from '../../components/Sign/VietNamCurrency';
import { CartService } from '../../services/cart';
import { parseUrl } from '../../utils';
import { useTranslation } from 'react-i18next';
import {AppToast} from "../../utils/appToast"
import {FcInfo} from "react-icons/fc"
const imageSize = '80px';
export default function Item({ product, selected }) {
  const [loading, setLoading] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();
  const variants = product.productVariantOptions.filter((value) =>
    product.sku
      .split('_')
      .slice(1, 3)
      .find((id) => value._id === +id),
  );
  const image = variants.find((x) => x.image !== '' && x.image !== null).image;
  const onUpdateQuantity = (q) => {
    if (q === null || q === undefined || +q === 0) {
     AppToast(t("quantity_not_less_than_1"), "warning")
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
  const onSelect = (e) => {
    if (product.selected) {
      dispatch(removeItem(product.sku));
    } else {
      dispatch(selectItem(product.sku));
    }
  };
  const {t} = useTranslation();
  const handleDeleteProduct = async()=>{
    try{
    await CartService.deleteProductItem(product.sku);
      AppToast(t("remove_product_success"), "success")
      dispatch(deleteProductItem(product))
    }catch(error){
      AppToast(`${t("remove_product_fail")}, ${t("please_try_again")}`, "error")
    }
  }
  return (
    <div
    
    className={`my-2 flex items-center gap-4 border-b ${product.deleted ? 'opacity-50' : 'opacity-1'}`}>
      <div className="flex flex-[5] items-center">
        <input
          disabled={product.deleted}
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
            <button
            disabled={product.deleted}
             className="flex items-center gap-2">
              {t("sort")} <AiFillCaretDown size="16px" />
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
          deleted={product.deleted}
          isLoading={loading}
          current={product.quantity}
          onChange={onUpdateQuantity}
        />
      </div>
      <div className="flex-[2]">
        <Price price={product.quantity * product.price} />
        <VietNamCurrency />
      </div>
      <div>
        <button disabled={product.deleted } onClick={handleDeleteProduct} className="border-gray-200 p-2 rounded-md text-sm px-4 font-bold border-2 hover:shadow-md hover:border-white disabled:shadow-none hover:disabled:border-gray-200" >{t("delete")}</button>
        {product.deleted && <FcInfo className='ml-auto my-1' title={t("product_is_deleted")}/>}
        </div>
    </div>
  );
}
