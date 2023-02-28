import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'


function DropDownCategories() {
  const categories = [
    { id: 1, name: 'S' },
    { id: 2, name: 'M' },
    { id: 3, name: 'L' },
    { id: 4, name: 'XL' },
    { id: 5, name: '2XL' },
  ];
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const ref = useRef(null);
  window.addEventListener('click', (e) => {
    const target = e.target;
    if (ref.current !== null && !ref.current.contains(target)) {
      setShowDropdown(false);
    }
  });
  return (
    <div ref={ref} className="relative z-[1000]">
      <div className="flex items-center ">
        <p
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-[40px] cursor-pointer select-none truncate"
        >
          {selectedCategory.name}
        </p>
        <IoIosArrowForward
          className={`transition duration-300 ease-in-out ${
            showDropdown ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </div>
      {
        <div
          style={{
            opacity: showDropdown ? 1 : 0,
            backgroundColor: 'rgb(74, 222, 128)',
          }}
          className={`${
            showDropdown ? 'z-[1000]' : 'z-[-999]'
          } absolute -left-2 my-4 flex max-w-[600px] flex-wrap  gap-y-2 rounded-lg p-4 opacity-0 shadow-lg shadow-indigo-300 transition duration-300 ease-in-out`}
        >
          {categories.map((category, index) => (
            <div
              onClick={() => {
                setSelectedCategory(category);
              }}
              key={index}
              className={`w-200px cursor-pointer truncate rounded-md px-1 ${
                category.id === selectedCategory.id && 'bg-gray-300'
              } hover:bg-gray-300`}
            >
              {category.name}
            </div>
          ))}
        </div>
      }
    </div>
  );
}
export default function Product(
 ) {
  return (
    <div className='px-[2rem]'>
      <Link to="/" className='text-blue-500'>Trang chủ</Link>
      {' > '}
      <Link to="'/:id'" className='text-blue-500'>Sản phẩm</Link>
      <div className="grid grid-cols-2 bg-white">
        <div className="bg-gray-600 border-4 w-4/5">
          <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
        </div>
        <div className="block col-start-2 w-full">
          <div className="text-2xl font-bold w-full block mt-5">Áo Bomber TEDDY xanh rêu</div>
          <div className='text-base block mt-3'>Chất liệu: nỉ cotton Túi cơi kẻ trắng cực đẹp, cúc bấm</div>
          <div className="flex items-center gap-1">
            <div className="text-4xl font-bold my-7 text-green-400">169.000</div>
            <div className="text-base font-bold mb-2 ml-2 text-red-400 underline decoration-2">VNĐ</div>
          </div>
          < div className="justify-between  gap-1">
            <div className="gap-4 flex text-1xl">
              Màu sắc: 
                <button className='bg-white hover:text-white hover:bg-black w-10 mr-3'>Đen</button>
                <button className='bg-white hover:text-white hover:bg-red-500 w-10  mr-3'>Đỏ</button> 
                <button className='bg-white  hover:bg-gray-200 w-14  mr-3'>Trắng</button>
            </div>
            <div className="gap-4 flex text-1xl mt-6">
              Size: 
              <div className="flex items-center justify-center rounded-l-[3px] bg-gray-300 px-2 ">
                <DropDownCategories />
              </div>
            </div>
          </div>
          <div className="gap-4 flex text-1 xl mt-6">
            Số lượng: 
            <div className='flex border-2 border-blue-200 '>
              <div className='flex mx-2 w-4 border-1 hover:bg-green-400 cursor-pointer'>
                <button>
                  <AiOutlineMinus/>
                </button>
              </div>

              <input className='text-center border-1 w-9 cursor-default' type="text" value="1"/>
              
              <div className='flex mx-2 w-6 border-1 hover:bg-green-400 cursor-pointer'>
                <button>
                  <BsPlusLg/>
                </button>
              </div>
            </div>
          </div>
          <button className="text-white rounded-lg hover:bg-blue-500 flex flex-1 items-center justify-center bg-green-400 group gap-x-2 h-10 ml-3 mt-6">
            <MdOutlineAddShoppingCart className='ml-2'/>
            <p className='font-bold mr-3'>Thêm vào giỏ hàng</p>
          </button>
        </div>  
      </div>
      <div className=''>
        <div className='bg-white text-center rounded-lg text-3xl font-bold mt-10 p-3 '>
          Sản Phẩm Nổi Bật
        </div>
        <div className='flex grid mt-5'>
          <div className='flex'>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
          </div>        
          <div className='flex mt-7'>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
            <div className="bg-gray-600 border-4 w-4/5">
                <img src="https://cf.shopee.vn/file/sg-11134201-22110-d8kpbe0d2hkve0" alt=""/>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}
