import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigateTo = useNavigate();

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    if (secureLocalStorage.getItem("isAdminLoggedIn") === "true") {
      navigateTo("/admin/dashboard");
    }else if (secureLocalStorage.getItem("isLoggedIn") === "true") {
      navigateTo("/dashboard");
    }
  }, [navigateTo])

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-full md:w-96 m-4 md:m-32'>
        <Card className='h-full md:h-auto' border='secondary'>
          <Card.Body>
            {isSignUp ? (
              <SignUpForm handleSignUp={handleSignUp} />
            ) : (
              <LoginForm handleSignUp={handleSignUp} />
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
