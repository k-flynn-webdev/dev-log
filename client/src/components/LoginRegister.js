import * as React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react';

import { REGISTER, LOGIN, EMAIL, EMAIL_PLACEHOLDER, PASSWORD, PASSWORD_PLACEHOLDER, NO_ACCOUNT, HAVE_ACCOUNT } from '../lang/en-gb';
import { validEmail, validPassword } from '../helpers/authentication';

import FormInput from './FormInput';

function LoginRegister({ isLogin }) {
	const [emailValue, setEmail] = useState('')
	const [emailIsValid, setEmailIsValid] = useState(true)
	const [passwordValue, setPassword] = useState('')
	const [passwordIsValid, setPasswordIsValid] = useState(true)
	const [formIsValid, setFormIsValid] = useState(false)

	useEffect(() => updateForm(), [emailValue, passwordValue])

	const handleEmail = (event) => {
		const email = event.target.value
		setEmail(email)
		setEmailIsValid(validEmail(email))
		if (!email) setEmailIsValid(true)
	}

	const handlePassword = (event) => {
		const password = event.target.value
		setPassword(password)
		setPasswordIsValid(validPassword(password))
		if (!password) setPasswordIsValid(true)
	}

	const updateForm = () => {
		setFormIsValid(emailValue && emailIsValid &&
				passwordValue && passwordIsValid)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	return (
		<div className="login__input">
			<form id='loginForm' onSubmit={handleSubmit}>
					<FormInput
							label={EMAIL}
							placeholder={EMAIL_PLACEHOLDER}
							value={emailValue}
							type="email"
							isValid={emailIsValid}
							onChange={handleEmail}
					/>

					<FormInput
							label={PASSWORD}
							placeholder={PASSWORD_PLACEHOLDER}
							value={passwordValue}
							type="password"
							isValid={passwordIsValid}
							onChange={handlePassword}
					/>

					<div>
						<Button
								className="mt-5 action xs:full"
								type="submit"
								colorScheme="green"
								isDisabled={!formIsValid}
						>
							{isLogin ? LOGIN : REGISTER}
						</Button>
					</div>
			</form>

			<br/>

			<div className="mt-4">
				<span className="mr-1">
					{isLogin ? NO_ACCOUNT : HAVE_ACCOUNT}
				</span>
				<Link className="link"
							to={isLogin ? '/login/register' : '/login'}>
					{isLogin ? REGISTER : LOGIN}
				</Link>
			</div>
		</div>
	)
}

export default LoginRegister;