import React, { useEffect, useState } from 'react'
import { RiCoupon2Line } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { emptySelected, selectAllItem } from '../../../app/slices/cart.slice';
import Price from '../../../components/Price';
import VietNamCurrency from "../../../components/Sign/VietNamCurrency";
import { useNavigate } from 'react-router-dom';
export default function ItemSelected() {
  const cart = useAppSelector(state => state.cart.cart);
  const itemSelected = useAppSelector(state => state.cart.itemSelected);
  const [totalPrice, settotalPrice] = useState(0);
  const [checked, setChecked] = useState(false)
  const dispatch = useAppDispatch()
  function getIntersection(arr1, arr2) {
  return arr1.filter((element) => arr2.map(x => x.product.sku).includes(element.product.sku));
}
  useEffect(()=>{
    if(itemSelected.length > 0 && itemSelected.length === cart.length){
      setChecked(true)
    }else{
      setChecked(false)
    }
  },[itemSelected])
  useEffect(()=>{
    const x = getIntersection(cart, itemSelected);
    console.log("🚀 ~ file: index.jsx:25 ~ useEffect ~  x:",  x)
    if(itemSelected.length > 0){
      const price = itemSelected.reduce((prev, curr)=>{
        return prev + (curr.product.price * curr.quantity)
      },0)
      settotalPrice(price)
    }else{
      settotalPrice(0)
    }
  },[cart,itemSelected])
  const handleSelectAll = ()=>{
    if(checked){
      dispatch(emptySelected())
    }else{
      dispatch(selectAllItem())
    }
  }
  const navigate =useNavigate();
  const handleBuy = ()=>{
    
    navigate("/checkout")
  }
  return (
    <div
      className="fixed bottom-0 bg-white z-50 w-4/5 shadow-lg rounded-sm text-lg"
    >
      <div className="border-b w-full py-2 flex gap-2 justify-end items-center px-2">
        <p>Coupon</p>
        <button className="flex gap-2 justify-end items-center text-blue-400">
          <RiCoupon2Line size="16px"/>
          Select coupon
        </button>
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <input id="selectAllItems" type="checkbox" className='w-5 h-5' checked={checked} onChange={handleSelectAll}/>
          <label htmlFor="selectAllItems">Select All ({cart.length})</label>
          <button>Remove</button>
        </div>
        <div className="flex items-center gap-4">
          <p>Total ({itemSelected.length} products): <Price price={totalPrice}/> <VietNamCurrency/> </p>
          <button onClick={handleBuy} disabled={
            itemSelected.length === 0 ? true : false
          } className="bg-blue-300 py-2 px-12 flex items-center justify-center rounded-md disabled:cursor-not-allowed hover:scale-[1.05]">
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}
