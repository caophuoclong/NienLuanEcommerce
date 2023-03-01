import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Default({children}) {
  return (
    <div className="flex flex-col gap-4 bg-[#f5f5f5]">
        <Header/>
        <main className={`px-[20rem] mt-32`}>
          {children}
        </main>
        <Footer/>
    </div>
  )
}
