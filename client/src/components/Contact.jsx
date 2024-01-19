import React, { useEffect, useState } from 'react'
import { Form, Label, Input, FormGroup } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/Auth/userSlice'
import { contact } from '../redux/Contact/ContactSlice'

const Contact = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [isData, setIsdata] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const { payload } = await dispatch(fetchUser({ token }))
      if (payload) {
        setIsdata(true)
      }
    }
    getUser()
  }, [])

  const { userData } = useSelector((state) => state.user.data)

  if (userData && isData) {
    setUsername(userData.username)
    setEmail(userData.email)
    setMessage("")
    setIsdata(false)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(contact({ username, email, message }))
    setUsername('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className='page-container'>
      <div className="div-wrapper-contact">
        <div className="left-div-contact">
          <p className='contact-left-heading'>Lets Get in Touch!</p>
          <p className='contact-para'>Have a question or need assistance? Reach out <br /> to us via email,<br />
            phone, or the contact form below. We're <br /> eager to assist you.</p>
          <p className='contact-footer-text'>Nice hearing from you!</p>
        </div>
        <div className="right-div-contact">
          <Form className='form-contact'>
            <FormGroup>
              <Label for="exampleName">
                Name
              </Label>
              <Input
                id="exampleName"
                name="name"
                placeholder="Enter Name"
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
              <Label for="exampleText">
                Message
              </Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
            <div className='register-btn' onClick={(e) => onSubmitHandler(e)}>Submit</div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact
