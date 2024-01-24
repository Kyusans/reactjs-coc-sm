import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm';

function Login() {
	const [isSignUp, setIsSignUp] = useState(false);

	const handleSignUp = () => {
		setIsSignUp(!isSignUp);
	}
	return (
		<div className='bg-zinc-900 h-screen flex justify-center items-center'>
			<Card className='w-96' border='secondary'>

				<Card.Body>
					{isSignUp ?
						<SignUpForm handleSignUp={handleSignUp} />
						:
						<LoginForm handleSignUp={handleSignUp} />
					}
				</Card.Body>
			</Card>
		</div>
	)
}

export default Login