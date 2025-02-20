import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold text-slate-800 my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" action="">
        <input type="text" placeholder='username' className='bg-slate-200 text-cyan-700  border p-3 rounded-lg' id='username'>
        </input>
        <input type="email" placeholder='email' className='bg-slate-200 text-cyan-700 border p-3 rounded-lg' id='email'>
        </input>
        <input type="password" placeholder='password' className='bg-slate-200 text-cyan-700  border p-3 rounded-lg' id='password'>
        </input>
        <button className="bg-slate-700 text-cyan-300 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Submit</button>
      </form>
      <div className="flex flex-row mx-auto mt-2 gap-2 justify-center text-red-500">
        <p>Already have an Account?</p>
        <Link to={"/signin"} className="text-blue-500 font-bold">SignIn</Link>
      </div>
    </div>
    </>
  )
}

export default SignUp
