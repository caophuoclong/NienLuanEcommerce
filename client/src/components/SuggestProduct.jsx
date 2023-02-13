import React from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

export default function SuggestProduct({
    products =[],
}) {
  return (
    <div className="">
        <p className="text-center bg-white rounded-md p-2 mb-4">Suggest Product</p>
        <div className="flex flex-wrap gap-4">
        {
            products.map((product, index)=> <Product key={index} {...product} perRow={6}/>)
        }
        </div>
    </div>
  )
}
