import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux'
import { validEmail, validPassword } from '../helpers/authentication';
import FormInput from './FormInput';
import { createUser, loginUser } from '../store/slices/user';

import {
	REGISTER,
	LOGIN,
	EMAIL,
	EMAIL_PLACEHOLDER,
	PASSWORD,
	PASSWORD_PLACEHOLDER,
	NO_ACCOUNT,
	HAVE_ACCOUNT,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
} from '../lang/en-gb';


function LoginRegister({ isLogin }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [emailValue, setEmail] = useState('')
	const [emailIsValid, setEmailIsValid] = useState(true)
	const [passwordValue, setPassword] = useState('')
	const [passwordIsValid, setPasswordIsValid] = useState(true)
	const [formIsValid, setFormIsValid] = useState(false)

	const successToast = useToast({
		position: 'top',
		title: isLogin ? LOGIN_SUCCESS : REGISTER_SUCCESS,
		isClosable: true,
		duration: 2500
	})

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

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!formIsValid) return

		const userDetails = { email: emailValue, password: passwordValue }

		if (!isLogin) {
			await dispatch(createUser(userDetails))
				.unwrap()
				.catch((e) => {
					throw(e)
				})
		}

		await dispatch(loginUser(userDetails))
			.unwrap()
			.then(() => {
				successToast()
				navigate('/')
			})
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
					{!isLogin ? HAVE_ACCOUNT : NO_ACCOUNT}
				</span>
				<Link className="link"
							to={!isLogin ? '/login' : '/login/register' }>
					{!isLogin ? LOGIN : REGISTER }
				</Link>
			</div>
		</div>
	)
}

export default LoginRegister;