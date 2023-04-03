import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { emptySelected, getCart, selectAllItem } from '../../app/slices/cart.slice';
import Item from './Item';
import Shop from './Shop';
import LoadingSkeleton from './LoadingSkeleton';
import ItemSelected from "./ItemSelected"

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartShop, setCartShop] = useState({});
  const dispatch = useAppDispatch();
  const itemSelected = useAppSelector(state => state.cart.itemSelected);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const unwrap = dispatch(getCart());
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      const tmpCartShop = { ...cartShop };
      cart.forEach((c) => {
        const { product, ...item } = c;
        const { shop, ...prd } = product;
        prd.quantity = item.quantity;
        if (!tmpCartShop[shop._id]) {
          tmpCartShop[shop._id] = {
            shopInfo: shop,
            products: [prd],
          };
        } else {
          const pr = tmpCartShop[shop._id].products;
          const isExist = pr.find((x) => x.sku === prd.sku);
          if (!isExist) {
            pr.push({
              ...item,
              ...prd,
            });
          }
          tmpCartShop[shop._id].products = pr;
        }
      });
      setCartShop(tmpCartShop);
    }
  }, [cart]);
  useEffect(() => {
    console.log(cartShop);
  }, [cartShop]);
  const handleSelectAll = ()=>{
    if(checked){
      dispatch(emptySelected())
    }else{
      dispatch(selectAllItem())
    }
  }
  useEffect(()=>{
    if(itemSelected.length > 0 && itemSelected.length === cart.length){
      setChecked(true)
    }else{
      setChecked(false)
    }
  },[itemSelected])
  return (
    <div className="mt-3 h-[calc(100vh-100px)]">
      <Link to="/" className="text-blue-500">
        Trang chủ
      </Link>
      {' > '}
      <Link to="'/Cart'" className="text-blue-500">
        Giỏ Hàng
      </Link>
      <h1 className="text-xl font-bold">Cart</h1>
      {/* Heading */}
      <div className="flex items-center gap-4 rounded-md bg-white p-1 px-2">
        <input checked={checked} onChange={handleSelectAll} type="checkbox" className="h-5 w-5" />
        <div className="flex-[5]">All {
          cart.length
        } products</div>
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
      <ItemSelected/>
    </div>
  );
}
