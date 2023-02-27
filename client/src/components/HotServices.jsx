import React from 'react'

export default function HotServices({
    services= []
}) {
  return (
    <div className="flex justify-center gap-x-4">
        {
            services.map((service, index)=><div key={index}  className="w-[100px] flex flex-col items-center ">
                <img src={service.src} style={{width:"45px", height: "45px"}}  alt=""  />
                <div className="text-[#212d4c] text-sm font-bold text-center">{service.name}</div>
            </div>)
        }
    </div>
  )
}
