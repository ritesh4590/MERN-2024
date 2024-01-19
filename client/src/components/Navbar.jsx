import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const authToken = useSelector((state) => state.login.token)
  const [token, setToken] = useState(authToken)


  console.log("Navbar fetched!!")
  console.log("navbar token", token)

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [token])

  const logout = () => {
    setToken('')
    localStorage.clear("token")
  }

  return (
    <div className="nav-container">
      <div className='nav-logo'>
        <h1>Navbar</h1>
      </div>
      <div className='nav-option-wrapper'>
        <NavLink to="/" className="nav-option">Home</NavLink>
        <NavLink to="/services" className="nav-option">Service</NavLink>
        <NavLink to="/contact" className="nav-option">Contact</NavLink>
        {token ?
          <NavLink to="/logout" className="nav-option" onClick={() => logout()}>Logout</NavLink>
          :
          <>
            <NavLink to="/login" className="nav-option">Login</NavLink>
            <NavLink to="/register" className="nav-option">Register</NavLink>
          </>}
      </div>
    </div >
  )
}

export default Navbar
