import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

export default function Header() {
    const cart = useAppSelector(state => state.cart.cart);
  return (
    <div className="my-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-medium italic">E-commerce</Link>
        <Link to="/cart" className="text-gray-500 relative">
            <BsCart4 size="32px"/>
            <span className="absolute w-5 h-5 flex items-center justify-center  bg-red-400 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/3 ">{cart.length}</span>
        </Link>
    </div>
  )
}
