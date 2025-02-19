import React from 'react'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/Signin'
import SignOut from './pages/SignOut'
import Profile from './pages/Profile'
import Contact from './pages/Contact'

import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <BrowserRouter>

    <Header/>

    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signout" element={<SignOut/>}/>
      
    </Routes>
    <Footer/>

    </BrowserRouter>
    </>
  )
}

export default App
