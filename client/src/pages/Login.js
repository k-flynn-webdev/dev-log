import * as React from 'react'
import { Box, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Login from '../components/Login';

function LoginPage() {

	return (
			<Box className="login">
				<Card className="login__card mb-2">

					<CardHeader>
						<h1 className="text-center text-3xl">Login</h1>
					</CardHeader>

					<CardBody>
						<Login />
					</CardBody>
				</Card>
			</Box>
	);
}

export default LoginPage;