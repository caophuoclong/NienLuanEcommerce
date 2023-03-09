import React from 'react';
import NavBar from '../components/header/navBar';
import HeaderWithSearch from '../components/header/HeaderWithSearch';
export default function Header() {

  return (
    <div className="flex flex-col text-white fixed z-[1000] w-full top-0 h-[100px]">
      <NavBar/>
      <HeaderWithSearch/>
    </div>
  );
}
