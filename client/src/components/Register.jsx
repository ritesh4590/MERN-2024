import React, { useState } from 'react'
import "../App.css"
import { Form, Label, Input, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/Auth/RegisterSlice'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.register)
  // console.log("register data:", data)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const registerAction = await dispatch(register({ username, email, phone, password }))

      // Check if the registration was successfully or not
      if (register.fulfilled.match(registerAction)) {
        const serverToken = registerAction.payload.token
        localStorage.setItem('token', serverToken)
        if (serverToken) {
          navigate('/')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='page-container'>
      <div className='registration-wrapper'>
        <div className='left-div'>
          <div className='text-wrapper'>
            <h1>Register Here!</h1>
            <Form>
              <FormGroup>
                <Label for="username">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
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
                <Label for="phoneno">
                  Phone Number
                </Label>
                <Input
                  id="phoneno"
                  name="phone"
                  placeholder="Enter Phone no"
                  type="Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                {isLoading ? `Please wait..` : `Register`}

              </div>
            </Form>
            <p className='onboarding-bottom-text'>Have an account?
              <Link to="/login">
                Login
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

export default Register
