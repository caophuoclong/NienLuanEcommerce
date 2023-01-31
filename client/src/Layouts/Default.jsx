import React from 'react'
import Header from './Header'

export default function Default({children}) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}
