import React from 'react'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import Search from './pages/Search'

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
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/search" element={<Search/>}/>
      
      <Route path="/profile" element={<Profile/>}/>
      {/* <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          /> */}
    </Routes>
    <Footer/>

    </BrowserRouter>
    </>
  )
}

export default App
