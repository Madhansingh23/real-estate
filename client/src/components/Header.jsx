import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import "@/styles/globals.css";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to='/' className="text-2xl font-extrabold flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient">Madhan's</span>
          <span className="text-white ml-1">Estate</span>
        </Link>
        
        <form className='bg-white/20 p-2 rounded-lg flex items-center shadow-md backdrop-blur-md'>
          <input 
            type="text" 
            placeholder="Search..." 
            className='bg-transparent text-white font-semibold placeholder-gray-200 focus:outline-none w-32 sm:w-64 px-2'
          />
          <FaSearch className='text-white ml-2' />
        </form>
        
        <ul className='flex space-x-4 text-white font-medium'>
          <Link to='/'><li className='hidden sm:inline hover:text-yellow-300 transition-all'>Home</li></Link>
          <Link to='/about'><li className='hidden sm:inline hover:text-yellow-300 transition-all'>About</li></Link>
          <Link to='/contact'><li className='hidden sm:inline hover:text-yellow-300 transition-all'>Contact</li></Link>
          <Link to='/signin'><li className='hover:text-yellow-300 transition-all'>Sign In</li></Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;