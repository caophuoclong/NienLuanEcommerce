import React from 'react'
import { FaStar, FaTshirt } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri'

export default function ShopInfo({img, username, followers, following, productLen, rating, color}) {
  return (
    <div className={`flex h-32 w-full cursor-pointer items-center gap-2 rounded-lg p-4 shadow-lg ${color} my-2`}>
            {/* Avatar and badge */}
            <div className="relative h-16 w-16 rounded-full border-[0.5px] border-black">
              <img src="https://picsum.photos/80" className="rounded-full" />
              {/* Badge mall */}
              <div className="absolute bottom-0 left-1/2 flex h-4 w-full translate-y-1/3 -translate-x-1/2 items-center justify-center rounded-lg bg-blue-700 px-1">
                <span className="text-[11px] font-bold italic text-white">
                  Shop mall
                </span>
              </div>
            </div>
            {/* Name */}
            <div>
              <p className="text-xl font-semibold">Ao Thun Bay Mau</p>
              <p className="text-sm">@username</p>
              <div className="flex text-xs">
                <span className="text-blue-700">490k</span> Followers{' '}
                <span className="mx-2">|</span>
                <span className="text-blue-700">30</span> Following
              </div>
            </div>
            <div className="ml-auto flex">
              {/* Total products */}
              <div className="px-4 border-x">
                <div className="flex gap-2">
                  <FaTshirt color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">50</span>
                </div>
                <span className="text-sm">Products</span>
              </div>
              {/* Rating */}
              <div className="px-4 border-r">
                <div className="flex gap-2">
                  <FaStar color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">4.5</span>
                </div>
                <span className="text-sm">Rating</span>
              </div>
              {/* Response Rate */}
              <div className="px-4 border-r">
                <div className="flex gap-2">
                  <RiMessage3Fill color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">90%</span>
                </div>
                <span className="text-sm">Response Rate</span>
              </div>
            </div>
          </div>
  )
}
