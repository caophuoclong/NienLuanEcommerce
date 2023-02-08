import React from 'react'
import Header from './Header'

export default function Default({children}) {
  return (
    <div className="flex flex-col gap-4">
        <Header/>
        <main className={`px-[10rem]`}>
          {children}
        </main>
    </div>
  )
}
