import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCart4, BsSearch } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services';
import { useAppSelector } from '../../app/hooks';
const primaryColor = '#243256';
function DropDownCategories() {
  const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Clothes' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Accessorier' },
    { id: 1, name: 'All' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Clothes' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Accessorier' },
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
          className="w-[100px] cursor-pointer select-none truncate"
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
            visibility: showDropdown ? 'visible' : 'hidden',
            backgroundColor: '#374151',
          }}
          className={`${
            showDropdown ? 'z-[1000]' : 'z-[-999]'
          } absolute -left-2 my-4 flex w-[max-content] max-w-[600px] flex-wrap  gap-y-2 rounded-lg p-4 opacity-0 shadow-lg shadow-indigo-300 transition duration-300 ease-in-out`}
        >
          {categories.map((category, index) => (
            <div
              onClick={() => {
                setSelectedCategory(category);
              }}
              key={index}
              className={`w-1/5 cursor-pointer truncate rounded-md px-1 ${
                category.id === selectedCategory.id && 'bg-[#212d4c]'
              } hover:bg-[#212d4c]`}
            >
              {category.name}
            </div>
          ))}
        </div>
      }
    </div>
  );
}
export default function HeaderWithSearch() {
  const { t } = useTranslation();
  const cartLength = useAppSelector((state) => state.cart.cart).length;
  const [nameKeyword, setNameKeyword] = useState('');
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: primaryColor }}
      className="flex items-center gap-x-4 px-[10rem] py-2"
    >
      <Link to="/" className="flex items-center gap-2">
        {/* Logo */}
        <img src="https://picsum.photos/40" className="rounded-full" />
        {/* Brand name */}
        <span className="text-xl font-medium italic">E-commerce</span>
      </Link>
      {/* Search bar */}
      <div className="mx-auto flex w-[60%]">
        {/* categories */}
        {/* <div className="flex items-center justify-center rounded-l-[3px] bg-gray-700 px-2 ">
          <DropDownCategories />
        </div> */}
        <input
          value={nameKeyword}
          onChange={(e) => setNameKeyword(e.target.value)}
          className="h-10 w-8/12 px-2 text-black outline-none"
        />
        <button
          className="flex w-16 items-center justify-center rounded-r-[3px] bg-orange-400"
          onClick={() => navigate(`/search?keyword=${nameKeyword}`)}
        >
          <BsSearch />
        </button>
      </div>
      {/* Cart */}
      <Link to="/cart" className="flex items-center gap-2">
        <div className="relative h-[60px] w-[40px]">
          <BsCart4 size="full" />
          {cartLength > 0 && (
            <div className="absolute top-2 -right-6 flex h-4 w-6 items-center justify-center rounded-full bg-red-400 text-sm">
              {cartLength > 9 ? '9+' : cartLength}
            </div>
          )}
        </div>
        {/* <div className="flex flex-col">
            <span>Cart</span>
            <span>0.00</span>
          </div> */}
      </Link>
    </div>
  );
}
