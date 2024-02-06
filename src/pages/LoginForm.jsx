import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'

function LoginForm({ handleSignUp }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>Welcome</h1>

      <FloatingLabel className='mt-4' label="Username or Email">
        <Form.Control value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='Id' />
      </FloatingLabel>
      <FloatingLabel className='mt-3' label="Password">
        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
      </FloatingLabel>
      <div className='mt-3 text-center'>
        <Button className='w-100 py-2' variant='outline-dark'><h6 className='font-bold'>Login</h6></Button>
      </div>

      <Container className='mt-3 text-center'>
        <p>
          Don't have an account?{" "}
          <span className='font-bold cursor-pointer hover:underline transition duration-300 ease-in-out' onClick={ handleSignUp }>Sign up</span>
        </p>
      </Container>
    </div>
  )
}

export default LoginForm