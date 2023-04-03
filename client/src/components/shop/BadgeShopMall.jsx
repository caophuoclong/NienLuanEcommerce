import React from 'react';

export default function BadgeShopMall({ absolute = true }) {
  return (
    <div
      style={
        absolute
          ? {
              position: 'absolute',
              transform: 'translate( -50%,33.3333%)',
            }
          : {}
      }
      className="bottom-0 left-1/2 flex h-4 w-[70px] items-center justify-center rounded-lg bg-blue-700 px-1"
    >
      <span className="text-xs font-bold italic text-white">Shop mall</span>
    </div>
  );
}
