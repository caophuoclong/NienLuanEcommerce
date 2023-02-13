import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner({ number = 3, direction = 'row', height = '110px', banner = [] }) {
  
  return (
    <div
      className="flex bg-white flex-wrap items-center justify-between gap-2 w-full p-2 rounded-md" >
      {banner.map((item, index) => (
        <div key={index} to={item.to} style={{
          width: `calc(100% / ${number} - 1rem)`,
        }} className="rounded-lg">
            <img src={item.src} style={{
              height: height,
              width: '100%',
            }} width={"100%"} className={`rounded-lg`} />
        </div>
      ))}
    </div>
  );
}
