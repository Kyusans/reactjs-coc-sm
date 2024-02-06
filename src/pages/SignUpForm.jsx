import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
function SignUpForm({ handleSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading('Creating your account');
    try {
      const url = secureLocalStorage.getItem("url");

      const jsonData = {
        username: username,
        email: email,
        password: password
      }

      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "signup");

      const res = await axios.post(url, formData);

      toast.dismiss(loadingToast);

      if (res.data === -1) {
        toast.error('Account already exists!');
        return;
      } else if (res.data === 1) {
        toast.success('Account created successfully!');
        handleSignUp();
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!');
    }, 3000)
  };
  // if (password === confirmPassword) {
  //   handleSignUp(username, email, password);
  // } else{
  //   return;
  // }


  const handleValidation = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');

    } else if (form.checkValidity()) {
      signup();
    }
    setValidated(true);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Create your account</h1>
      <Container className='mt-3 text-center'>
        <Form noValidate validated={validated} onSubmit={handleValidation}>
          <FloatingLabel label="Username">
            <Form.Control
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <Form.Control.Feedback type="invalid" className='font-bold'>
              This field is required
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className='mt-3' label="Email">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Form.Control.Feedback type="invalid" className='font-bold'>
              This field is required
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className='mt-3' label="Password">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid" className='font-bold'>
              This field is required
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className='mt-3 mb-3' label="Confirm Password">
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <Form.Control.Feedback type="invalid" className='font-bold'>
              This field is required
            </Form.Control.Feedback>
          </FloatingLabel>

          <Button type='submit' className='w-100 py-2' variant='outline-dark'>
            <h6 className='font-bold'>Sign up</h6>
          </Button>
        </Form>

      </Container>

      <Container className='mt-3 text-center'>
        <p>
          Already have an account? {" "}
          <span className='font-bold cursor-pointer hover:underline transition duration-300 ease-in-out' onClick={handleSignUp}>Login</span>
        </p>
      </Container>
    </div>
  )
}

export default SignUpForm