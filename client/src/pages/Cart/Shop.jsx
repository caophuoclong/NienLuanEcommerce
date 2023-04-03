import React, { useEffect, useState } from 'react'
import BadgeShopMall from "../../components/shop/BadgeShopMall"

import {AiOutlineShop} from "react-icons/ai"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeItem, selectItem } from '../../app/slices/cart.slice';
export default function Shop({shopInfo, children}) {
  const cart = useAppSelector(state => state.cart.cart);
  const itemSelected = useAppSelector(state => state.cart.itemSelected);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const handleSelectAllProducts = (e)=>{
    const x = cart.filter(item => item.product.shop._id === shopInfo._id);
    if(!checked){
      dispatch(selectItem(x))
    }else{
      dispatch(removeItem(x))
    }
  }
  useEffect(()=>{
      const item = itemSelected.filter(x => x.product.shop._id === shopInfo._id);
      if(item.length === children.length){
        setChecked(true)
      }else{
        setChecked(false)
      }
    
  },[itemSelected])
  return (
    <div className='p-2 bg-white rounded-md my-2 shadow-lg'>
      <div className="flex items-center gap-2 text-md">
        <input checked={checked} onChange={handleSelectAllProducts} width="1rem" height="1rem" className='w-5 h-5 border-white ' id="selectAll" type="checkbox" />
        <div className="w-16">
          {
          1 ? <BadgeShopMall absolute={false}/> : <AiOutlineShop/>
        }
        </div>
        <label htmlFor='selectedAll'>{shopInfo.shop_name}</label>
      </div>
        {
            children
        }
    </div>
  )
}
