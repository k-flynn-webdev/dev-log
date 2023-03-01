import * as React from 'react'
import { useLocation } from 'react-router-dom';
import { Box, Card, CardHeader, CardBody, CardFooter, Flex } from '@chakra-ui/react'
import { REGISTER, LOGIN } from '../lang/en-gb';
import Login from '../components/Login';
import LoginGoogle from '../components/LoginGoogle';
import LoginGithub from '../components/LoginGithub';
import Register from '../components/Register';


function LoginPage() {
	const location = useLocation().pathname;
	const isLogin = location === '/login'

	const title = isLogin ? LOGIN : REGISTER
	const Form = isLogin ? <Login /> : <Register />


	return (
			<Box className="login">
				<Card maxW='sm' className="login__card mb-2 mx-auto">

					<CardHeader>
						<h1 className="text-center text-3xl">{title}</h1>
					</CardHeader>

					<CardBody>

						<div className="socials-bar mb-4">
							<LoginGoogle />
							<LoginGithub />
						</div>

						<hr className="solid mb-4" />

						<div>
							{Form}
						</div>

					</CardBody>
				</Card>
			</Box>
	);
}

export default LoginPage;