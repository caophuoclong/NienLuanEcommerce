import React from 'react'
import { Link } from 'react-router-dom'


export default function Product() {
  return (
    <div className='px-[10rem]'>
      <Link to="/" className='text-blue-500'>Trang chủ</Link>
      {' > '}
      <Link to="'/:id'" className='text-blue-500'>Sản phẩm</Link>
      <div className="grid grid-cols-2">
        <div className="bg-gray-600 border-4 w-4/5">
            <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
        </div>
        <div className="block col-start-2 w-full">
          <p className="text-2xl font-bold w-full block ml-10 mt-5">Áo Bomber TEDDY xanh rêu</p>
          <p className='text-sm block mt-3'>Chất liệu: nỉ cotton Túi cơi kẻ trắng cực đẹp, cúc bấm</p>
          <p className="text-1xl">Giá: 200.000đ</p>
          <p className="text-1xl">Số lượng: 1</p>
         </div>  
      </div> 
    </div>
    
  )
}
