import React from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { useAppSelector } from '../../app/hooks';
export default function Cart(

) {
  const cart = useAppSelector(state => state.cart);

  return (
    <div className="mt-3">
      <Link to="/" className="text-blue-500">
        Trang chủ
      </Link>
      {' > '}
      <Link to="'/Cart'" className="text-blue-500">
        Giỏ Hàng
      </Link>
      <h1 className="text-xl font-bold">Cart</h1>
      {/* Heading */}
      <div className="flex bg-white p-1 rounded-md items-center px-2 gap-4">
        <input type="checkbox" className='w-5 h-5' />
        <div className="flex-[4]">All 2 products</div>
        <div className="flex-[2]">UnitPrice</div>
        <div className="flex-[2]">Quantity</div>
        <div className="flex-[2]">TotalPrice</div>
        <button>
            <BiTrash size="24px" />
          </button>
      </div>
      {/* Body */}
      <div>
        {/* Body item per shop */}
      </div>
    </div>
  );
}
