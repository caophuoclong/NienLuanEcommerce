import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCart4, BsSearch } from 'react-icons/bs';
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
const primaryColor = "#243256"
function DropDownCategories(){
  const categories = [
    {id: 1, name: 'All'},
    {id: 2, name: 'Electronics'},
    {id: 3, name: 'Clothes'},
    {id: 4, name: 'Shoes'},
    {id: 5, name: 'Accessorier'},
        {id: 1, name: 'All'},
    {id: 2, name: 'Electronics'},
    {id: 3, name: 'Clothes'},
    {id: 4, name: 'Shoes'},
    {id: 5, name: 'Accessorier'},
  ]
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const ref = useRef(null);
  window.addEventListener("click", (e)=>{
    const target = e.target;
    if(!ref.current.contains(target)){
      setShowDropdown(false)
    }
  })
  return (
    <div ref={ref} className="relative">
      <div className="flex items-center">
      <p onClick={()=> setShowDropdown(prev => !prev)} className='truncate w-[100px] select-none cursor-pointer'>{selectedCategory.name}</p>
      <IoIosArrowForward className={`transition ease-in-out duration-300 ${showDropdown ? "rotate-90": "rotate-0"}`}/>
    </div>
    {<div style={{
      opacity: showDropdown ? 1 : 0,
      backgroundColor: "#374151",
    }} className={`${showDropdown ? "z-[1000]" : "z-[-999]"} absolute transition duration-300 ease-in-out opacity-0 my-4 -left-2  p-4 rounded-lg flex flex-wrap w-[max-content] max-w-[600px] shadow-lg shadow-indigo-300 gap-y-2`}>
      {categories.map((category, index)=><div onClick={()=>{
        setSelectedCategory(category)
      }} key={index} className={`px-1 rounded-md w-1/5 truncate cursor-pointer ${category.id === selectedCategory.id && "bg-[#212d4c]"} hover:bg-[#212d4c]`}>
        {category.name}
      </div>)}
    </div>}
    </div>
  )
}
export default function HeaderWithSearch() {
  const { t } = useTranslation();
  const cartLength = 15;
  return (
    <div style={{backgroundColor: primaryColor}} className="flex items-center gap-x-4 px-[10rem] py-2">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <img src="https://picsum.photos/40" className="rounded-full" />
        {/* Brand name */}
        <span className="text-xl font-medium italic">E-commerce</span>
      </div>
      {/* Search bar */}
      <div className="mx-auto flex w-[60%]">
        {/* categories */}
        <div className="rounded-l-[3px] bg-gray-700 px-2 flex justify-center items-center ">
          <DropDownCategories/>
        </div>
        <input className="h-10 w-8/12 px-2 text-black outline-none" />
        <button className="flex w-16 items-center justify-center rounded-r-[3px] bg-orange-400">
          <BsSearch />
        </button>
      </div>
      {/* Cart */}
      <div className="flex items-center gap-2">
        <div className="relative h-[60px] w-[40px]">
          <BsCart4 size="full" />
          <div className="absolute top-2 -right-6 flex h-4 w-6 items-center justify-center rounded-full bg-red-400 text-sm">
            {cartLength > 0 && (cartLength > 9 ? '9+' : cartLength)}
          </div>
        </div>
        {/* <div className="flex flex-col">
            <span>Cart</span>
            <span>0.00</span>
          </div> */}
      </div>
    </div>
  );
}
