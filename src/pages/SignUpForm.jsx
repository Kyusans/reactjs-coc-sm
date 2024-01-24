import React from 'react'
import { Button, Container } from 'react-bootstrap'

function SignUpForm({ handleSignUp }) {
  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>Create your account</h1>
      <div className='mt-3 text-center'>
        <Button className='w-100 py-2' variant='outline-dark'><h6 className='font-bold'>Sign up</h6></Button>
      </div>
      <Container className='mt-3 text-center'>
        <p>Already have an account?<span className='text-blue-500 cursor-pointer' onClick={handleSignUp}> Login</span></p>
      </Container>
    </div>
  )
}

export default SignUpForm