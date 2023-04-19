import React, { useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useAppDispatch } from '../app/hooks';
import { getAllCategories, getHome, getMe } from '../app/slices/home.slice';
import { getCart } from '../app/slices/cart.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation } from 'react-router-dom';
const ScrollToToTop = ()=>{
  const location = useLocation();
  useEffect(()=>{
    console.log(location.pathname);
    document.body.scrollIntoView({ top: 0, left: 0,behavior: "smooth", block: "start" });
  },[location.pathname])
  return null;
}
export default function Default({ children }) {
  const dispatch = useAppDispatch();
   useEffect(() => {
    const unwrap = dispatch(getHome());
    const access_token = window.localStorage.getItem('access_token');
    if (
      access_token !== 'undefined' &&
      access_token !== null &&
      access_token !== undefined
    ) {
      (async () => {
        dispatch(getMe());
        dispatch(getAllCategories())
        const unwrap1 = dispatch(getCart());
        const result1 = await unwrapResult(unwrap1);
        const result = await unwrapResult(unwrap);
      })();
    }
  }, []);
  return (
    <div className="relative flex min-h-screen flex-col gap-4 bg-[#f5f5f5]">
      <Header />
      
      <main className={`mx-auto mt-32 w-4/5 `}>
        <ScrollToToTop/>
        {children}
        </main>
      {/* <Footer /> */}
    </div>
  );
}
