import React from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'
import { useTranslation } from 'react-i18next'

export default function SuggestProduct({
    products =[],
}) {
  const {t} = useTranslation()
  return (
    <div className="">
        <p className="text-center bg-white rounded-md p-2 mb-4">{t("suggesst_product")}</p>
        <div className="flex flex-wrap gap-4">
        {
            products.map((product, index)=> <Product key={index} {...product} perRow={5}/>)
        }
        </div>
    </div>
  )
}
