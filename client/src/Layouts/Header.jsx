import React from 'react';
import NavBar from '../components/header/navBar';
import HeaderWithSearch from '../components/header/HeaderWithSearch';
export default function Header() {

  return (
    <div className="flex flex-col text-white">
      {/* Row 1 */}
      <NavBar/>
      {/*  Row 2 */}
      <HeaderWithSearch/>
      {/* Row 3 */}
      <nav>
        
      </nav>
    </div>
  );
}
