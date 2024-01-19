import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { useDispatch } from 'react-redux'
// Components
import Protected from './components/Protected'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Contact from './components/Contact'
import Services from './components/Services'
import PageNotFound from './components/PageNotFound'
import Navbar from './components/Navbar'
import Logout from "./components/Logout"
import Admin from "./components/Admin"


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  console.log("app token:", token)

  return (
    <BrowserRouter>
      <Navbar authToken={token} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Protected Component={Contact} />} />
        <Route path='/services' element={<Services />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
