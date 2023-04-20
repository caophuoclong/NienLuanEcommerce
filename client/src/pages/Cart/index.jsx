import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  emptySelected,
  removeManyCartItem,
  selectAllItem,
} from '../../app/slices/cart.slice';
import Item from './Item';
import Shop from './Shop';
import LoadingSkeleton from './LoadingSkeleton';
import ItemSelected from './ItemSelected';
import { useTranslation } from 'react-i18next';
import { AppToast } from '../../utils/appToast';
import { CartService } from '../../services/cart';

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartShop, setCartShop] = useState({});
  const {t} = useTranslation();
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
  const handleDelete = async()=>{
    const anySelected = cart.map(x => x.selected).every(x => x === false);
    console.log(cart);
    if(anySelected){
      AppToast(t("please_choose_product"), "warning")
    }else{
      const cartSelected = cart.filter(cart => cart.selected);
      try{
        await CartService.handleDeleteManyCartItem(cartSelected.map(cart => cart._id))
      AppToast(t("remove_product_success"), "success")
        dispatch(removeManyCartItem(cartSelected.map(cart => cart._id)))
        }catch(error){
        AppToast(`${t("remove_product_fail")}, ${t("please_try_again")}`, "error")
      }
    }
  }
  return (
    <div className="mt-3 relative">
      <Link to="/" className="text-blue-500">
        {t("home")}
      </Link>
      {' > '}
      <Link to="'/Cart'" className="text-blue-500">
        {t("cart")}
      </Link>
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
            <div className="flex-[5]">{t("all")} {cart.length} {t("product")}</div>
            <div className="flex-[1]">{t("unit_price")}</div>
            <div className="flex-[2]">{t("quantity")}</div>
            <div className="flex-[2]">{t("total_price")}</div>
            <button onClick={handleDelete}>
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
        <div className=" mx-auto w-1/2 bg-white shadow-xl h-20 rounded-lg flex items-center justify-center">
          <p className="font-bold text-xl">{t("please_buy_more_product")}</p>
        </div>
      )}
    </div>
  );
}
