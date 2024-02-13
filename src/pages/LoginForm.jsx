import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function LoginForm({ handleSignUp }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const login = async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "user.php";
      const jsonData ={ 
        username: userId,
        password: password
      };

      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "login");

      const res = await axios.post(url, formData);
      console.log("res.data: ", JSON.stringify(res.data));
      if(res.data !== 0){
        secureLocalStorage.setItem("userId", JSON.stringify(res.data.user_id));
        secureLocalStorage.setItem("username", JSON.stringify(res.data.user_username));
        secureLocalStorage.setItem("email", JSON.stringify(res.data.user_email));
        secureLocalStorage.setItem("image", JSON.stringify(res.data.user_image));
        secureLocalStorage.setItem("level", JSON.stringify(res.data.user_level));

        if(res.data.user_level < 100){
          setTimeout(() => {
            navigateTo("/dashboard");
          });
        }

        // console.log("userId: ", secureLocalStorage.getItem("userId"));
        // console.log("username: ", secureLocalStorage.getItem("username"));
        // console.log("email: ", secureLocalStorage.getItem("email"));
        // console.log("image: ", secureLocalStorage.getItem("image"));
        // console.log("level: ", secureLocalStorage.getItem("level"));
        
      }else{
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error("Network error!", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  }

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
        <Button className='w-100 py-2' variant='outline-dark' onClick={login} disabled={isLoading}>
          <h6 className='font-bold'>
            {isLoading && <Spinner className='me-1' animation="border" size="sm" />}
            Login
          </h6>
        </Button>
      </div>

      <Container className='mt-3 text-center'>
        <p>
          Don't have an account?{" "}
          <span className='font-bold cursor-pointer hover:underline transition duration-300 ease-in-out' onClick={handleSignUp}>Sign up</span>
        </p>
      </Container>
    </div>
  )
}

export default LoginForm