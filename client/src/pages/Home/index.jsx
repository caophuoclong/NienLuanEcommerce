import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <Link to="/product/123">to Product</Link>
        <Link to="/product"> not found product</Link>
    </div>
  )
}
