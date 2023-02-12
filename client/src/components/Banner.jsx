import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner({ number = 3, direction = 'row', height = '110px' }) {
  const banner = [
    {
      to: '/khuyen-mai/3-2',
      src: 'https://picsum.photos/500/110',
    },
    {
      to: '/khuyen-mai/3-3',
      src: 'https://picsum.photos/500/110',
    },
    {
      to: '/khuyen-mai/3-4',
      src: 'https://picsum.photos/500/110',
    },

  ];
  const cl = ``
  return (
    <div
      className="flex bg-white flex-wrap items-center justify-between gap-2 w-full " >
      {banner.map((item, index) => (
        <div key={index} to={item.to} className="w-[calc(33%-0.5rem)] rounded-lg">
            <img src={item.src} className={` h-[110px] rounded-lg`} />
        </div>
      ))}
    </div>
  );
}
