import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className='bg-slate-800 shadow-md'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
      <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl  flex flex-wrap'>
          <span className="text-cyan-400 font-bold">Madhan's  </span>
          <span className='text-slate-400 font-bold'>  Estate</span>
          </h1>
          </Link>
          <form action="" className='bg-slate-600 p-3 mx-3 rounded-lg flex items-center'>
            <input type="text" placeholder="Search..." className='bg-transparent text-cyan-300 font-bold focus:outline-none w-24 sm:w-64' />
            <FaSearch className='text-cyan-300'/>
          </form>
          <ul className='flex g-4 font-semibold'>
            <Link to='/'><li className='hidden sm:inline text-cyan-500 ml-3 mr-3  hover:underline'>Home</li></Link>
            <Link to='/about'><li className='hidden sm:inline text-cyan-500 mr-3 hover:underline'>About</li></Link>
            <Link to='/contact'><li className='hidden sm:inline text-cyan-500 mr-3 hover:underline'>Contact</li></Link>
            <Link to='/signin'><li className='sm:inline text-cyan-500 mr-3 hover:underline'>SignIn</li></Link>
          </ul>
      </div>
    </header>
    </>
  )
}

export default Header
