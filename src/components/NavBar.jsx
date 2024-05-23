import React from 'react';
import './navbar.css';

function NavBar() {
  return (
    <nav className=" fixed bg-white z-10 top-0 w-full flex items-center justify-evenly  h-[70px] mx-[auto] pt-3">
      <div className="flex items-center">
        <img src="../public/logo.png" alt="Logo" className="h-6 w-36" />
      </div>
      <a href="#about" className="hover:text-green-600 decoration-none">About</a>
      <a href="#engineering" className="hover:text-green-600">Engineering</a>
      <a href="#agnibaan" className="hover:text-green-600">Agnibaan</a>
      <a href="#sorted" className="hover:text-green-600">SOrTeD</a>
      <a href="#team" className="hover:text-green-600">Team</a>
      <a href="#news" className="hover:text-green-600">News</a>
      <a href="#careers" className="hover:text-green-600">Careers</a>
      <div>
        <a href="#book-launch" className="w-full min-w-[130px]  px-[3%] py-[5%] bg-[#4d8c52]  font-poppins font-semibold leading-[1.67] text-white rounded hover:bg-green-700 flex justify-center items-center rounded-[30px]">BOOK A LAUNCH</a>
      </div>
    </nav>
  );
}

export default NavBar;

