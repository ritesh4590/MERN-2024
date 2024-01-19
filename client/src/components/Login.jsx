import React, { useState } from 'react'
import { Form, Label, Input, FormGroup } from 'reactstrap'
import "../App.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/Auth/LoginSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.login)

  console.log("Login state:", isLoading)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const loginAction = await dispatch(login({ email, password }))

      // Check if the login was successfull
      if (login.fulfilled.match(loginAction)) {
        const serverToken = loginAction.payload.token
        // localStorage.setItem('token', serverToken)
        if (serverToken) {
          navigate('/')
        }

      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='page-container'>
      <div className='registration-wrapper'>
        <div className='left-div'>
          <div className='text-wrapper'>
            <h1>Login</h1>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">
                  Email
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">
                  Password
                </Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <div onClick={(e) => handleSubmit(e)} className='register-btn'>
                {isLoading ? `Logging in...` : 'Login'}
              </div>
            </Form>
            <p className='onboarding-bottom-text'>Have an account?
              <Link to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className='right-div'>
          <img src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image loading..." />
        </div>
      </div>
    </div >
  )
}

export default Login
