import * as React from 'react'
import { useLocation } from 'react-router-dom';
import { Box, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { REGISTER, LOGIN } from '../lang/en-gb';
import Login from '../components/Login';
import Register from '../components/Register';


function LoginPage() {
	const location = useLocation().pathname;
	const isLogin = location === '/login'

	const title = isLogin ? LOGIN : REGISTER
	const Form = isLogin ? <Login /> : <Register />


	return (
			<Box className="login">
				<Card className="login__card mb-2">

					<CardHeader>
						<h1 className="text-center text-3xl">{title}</h1>
					</CardHeader>

					<CardBody>
						{Form}
					</CardBody>
				</Card>
			</Box>
	);
}

export default LoginPage;