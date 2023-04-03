import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Default({children}) {
  return (
    <div className="flex flex-col gap-4 bg-[#f5f5f5] relative">
        <Header/>
        <main className={`w-4/5 mt-32 mx-auto`}>
          {children}
        </main>
        <Footer/>
    </div>
  )
}
