import React from 'react'
import { BsCheck } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { removeCartItem } from '../../../../app/slices/cart.slice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Confirm({confirm}) {
  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(confirm){
      const products = confirm.orderItems;
      dispatch(removeCartItem(products));
    }
  },[confirm])
  const {t} = useTranslation();

  return (
    <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg drop-shadow-lg bg-white rounded-lg flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full border-blue-300 border-2 text-blue-300 flex items-center justify-center">
        <BsCheck size="64px"/>
      </div>
        <p>{t("hey")} <span className="font-semibold">{confirm.address.name}</span>, </p>
        <p className='font-bold text-3xl'>{t("your_order_is_confirmed")}</p>
        <p className="text-sm">{t("we_will_send_your_product_asab")}</p>
        <button onClick={()=>navigate("/user/purchase/processing")} className="bg-blue-300 rounded-md p-8 py-4 text-xl font-bold text-white my-2">{t("check_status").toUpperCase()}</button>
    </div>
  )
}
