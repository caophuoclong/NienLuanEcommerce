import React from 'react'
import Product from '../Product view'

export default function Default({children}) {
  return (
    <div>
        <Product/>
        <main className={`px-[10rem] mt-32`}>
          {children}
        </main>

    </div>
  )
}
