import React, { useEffect, useState } from 'react'
import { useRef } from 'react';

export default function Select({list, value, onChange}) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const handleClickOutSide = (e)=>{
      if(ref.current && !ref.current.contains(e.target)){
        setShow(false)
      }
    }
    document.addEventListener("click", handleClickOutSide, true)
    return()=>{
      document.removeEventListener("click", handleClickOutSide, true)
    }
  },[ref])
  return (
    <button ref={ref} disabled={list.length === 0} className="flex justify-start border-2 rounded-md py-2 w-full relative disabled:cursor-not-allowed" onClick={()=>setShow(!show)}>
      <span className='px-2'>{value ? value.name :"---select---"}</span>
      {
        show && <div className="absolute h-56 overflow-y-auto border-2 rounded-md -top-1/2 translate-y-1/3 w-full scrollbar-hide bg-white shadow-lg">
        {
          list.map(x => <div className="cursor-pointer hover:bg-blue-300 px-2 text-left w-[95%] rounded-r-md" onClick={()=>onChange(x)}>{x.name}</div>)
        }
      </div>
      }
    </button>
  )
}
