import React, { useId } from 'react'

export default function Input({
    name,
    children,
    value,
    onChange
}) {
    const id = useId()
  return (
    <div>
        <label className="text-gray-400 text-sm" htmlFor={id}>{name}</label>
        <div className="flex gap-2 border p-2 items-center rounded-lg">
            {
              children
            }
            <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder={name} id={id} className="w-full p-1 outline-none ring-0 border-none"/>
        </div>
    </div>
  )
}
