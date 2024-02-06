import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form, Spinner } from 'react-bootstrap'
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
      const url = secureLocalStorage.getItem("url") + "user.php";

      const jsonData = {
        username: username,
        email: email,
        password: password
      }

      console.log("jsonData: ", JSON.stringify(jsonData));

      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "signup");

      const res = await axios.post(url, formData);

      toast.dismiss(loadingToast);

      if (res.data === -1) {
        toast.error('Account already exists!');
        return;
      } else if (res.data === -2) {
        toast.error('Email already exists!');
        return;
      } else if (res.data === 1) {
        toast.success('Account created successfully!');
        handleSignUp();
      } else {
        toast.error("Account creation failed!");
        console.log("res.data: ", JSON.stringify(res.data));
      }
    } catch (error) {
      toast.error("Network error!", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleValidation = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setConfirmPassword('');
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
              type="text"
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

          <Button type='submit' className='w-100 py-2' variant='outline-dark' disabled={isLoading}>
            {isLoading ?
              <Spinner animation="border" size="sm" className='mr-2' />
              :
              <h6 className='font-bold'>Sign Up</h6>
            }
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