import React from 'react'
import { FaStar, FaTshirt } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import BadgeShopMall from "./BadgeShopMall"
import { useTranslation } from 'react-i18next'
export default function ShopInfo({img, auth, followers, following, productLength, shop_name, rating, color}) {
  const {t} = useTranslation();
  return (
    <Link to={`/search?shop=${auth?.username}`} className={`flex h-32 w-full cursor-pointer items-center gap-2 rounded-lg p-4 shadow-lg ${color} my-2`}>
            {/* Avatar and badge */}
            <div className="relative h-16 w-16 rounded-full border-[0.5px] border-black">
              <img src="https://picsum.photos/80" className="rounded-full" />
              {/* Badge mall */}
              <BadgeShopMall/>
            </div>
            {/* Name */}
            <div>
              <p className="text-xl font-semibold">{shop_name}</p>
              <p className="text-sm">@{auth?.username}</p>
              <div className="flex text-xs">
                <span className="text-blue-700">490k</span> {t("follower")}{' '}
                <span className="mx-2">|</span>
                <span className="text-blue-700">30</span> {t("following")}
              </div>
            </div>
            <div className="ml-auto flex">
              {/* Total products */}
              <div className="px-4 border-x">
                <div className="flex gap-2">
                  <FaTshirt color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">{productLength}</span>
                </div>
                <span className="text-sm">{t("product")}</span>
              </div>
              {/* Rating */}
              <div className="px-4 border-r">
                <div className="flex gap-2">
                  <FaStar color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">4.5</span>
                </div>
                <span className="text-sm">{t("rating")}</span>
              </div>
              {/* Response Rate */}
              <div className="px-4 border-r">
                <div className="flex gap-2">
                  <RiMessage3Fill color="rgb(29,78,216)" size="24px" />
                  <span className="text-blue-700">90%</span>
                </div>
                <span className="text-sm">{t("response_rate")}</span>
              </div>
            </div>
          </Link>
  )
}
