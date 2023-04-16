import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { validEmail, validPassword } from "../helpers/authentication"
import FormInput from "./FormInput"
import {
  createProfile,
  loginProfile,
  verifyProfile,
  lostProfile,
} from "../store/slices/profile"

import {
  REGISTER,
  LOGIN,
  EMAIL,
  EMAIL_PLACEHOLDER,
  PASSWORD,
  PASSWORD_PLACEHOLDER,
  NO_ACCOUNT,
  HAVE_ACCOUNT,
  LOST,
  LOST_PASSWORD,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOST_SUCCESS,
  VERIFY_SUCCESS,
} from "../lang/en-gb"

function LoginRegisterLost({ state, token }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [emailValue, setEmail] = useState("")
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passwordValue, setPassword] = useState("")
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [formIsValid, setFormIsValid] = useState(false)
  const [searchParams] = useSearchParams()

  const effectRan = useRef(false)

  const isLogin = state === "login"
  const isRegister = state === "register"
  const isLost = state === "lost"
  const isVerify = state === "verify"

  useEffect(() => {
    if (isLogin || isRegister) {
      setFormIsValid(
        emailValue && emailIsValid && passwordValue && passwordIsValid
      )
    }
  }, [emailValue, emailIsValid, passwordValue, passwordIsValid])

  useEffect(() => {
    if (isLost) {
      setFormIsValid(emailValue && emailIsValid)
    }
  }, [emailValue, emailIsValid, passwordValue, passwordIsValid])

  useEffect(() => {
    if (isVerify && !effectRan.current) {
      handleVerify()

      return () => {
        effectRan.current = true
      }
    }
  }, [])

  const getToastTitle = () => {
    if (isLogin) return LOGIN_SUCCESS
    if (isRegister) return REGISTER_SUCCESS
    if (isLost) return LOST_SUCCESS
    if (isVerify) return VERIFY_SUCCESS
  }

  const successToast = useToast({
    position: "top",
    title: getToastTitle(),
    isClosable: true,
    duration: 2500,
  })

  const handleEmail = event => {
    const email = event.target.value
    setEmail(email)
    setEmailIsValid(validEmail(email))
    if (!email) setEmailIsValid(true)
  }

  const handlePassword = event => {
    const password = event.target.value
    setPassword(password)
    setPasswordIsValid(validPassword(password))
    if (!password) setPasswordIsValid(true)
  }

  const handleVerify = async () => {
    const token = searchParams.get("token")

    if (!token) return

    await dispatch(verifyProfile(token))
      .unwrap()
      .then(() => {
        successToast()
        navigate("/")
      })
      .catch(e => {
        throw e
      })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!formIsValid) return

    if (isRegister) {
      await dispatch(
        createProfile({ email: emailValue, password: passwordValue })
      )
        .unwrap()
        .catch(e => {
          throw e
        })
    }

    if (isRegister || isLogin) {
      await dispatch(
        loginProfile({ email: emailValue, password: passwordValue })
      )
        .unwrap()
        .then(() => {
          successToast()
          navigate("/")
        })
    }

    if (isLost) {
      await dispatch(lostProfile({ email: emailValue }))
        .unwrap()
        .catch(e => {
          throw e
        })
    }
  }

  if (isVerify) {
    return <></>
  }

  return (
    <div className="login__input">
      <form id="loginForm" onSubmit={handleSubmit}>
        <FormInput
          labelText={EMAIL}
          placeholder={EMAIL_PLACEHOLDER}
          value={emailValue}
          type="email"
          isValid={emailIsValid}
          onChange={handleEmail}
        />

        <>
          {(isLogin || isRegister) && (
            <FormInput
              labelText={PASSWORD}
              placeholder={PASSWORD_PLACEHOLDER}
              value={passwordValue}
              type="password"
              isValid={passwordIsValid}
              onChange={handlePassword}
            />
          )}
        </>

        <div>
          <button
            className="primary full:xs"
            type="submit"
            disabled={!formIsValid}
          >
            {isLogin && LOGIN}
            {isRegister && REGISTER}
            {isLost && LOST}
          </button>
        </div>
      </form>

      <>
        {!isLost && (
          <>
            <br />
            <div className="mt-4">
              <span className="mr-1">
                {!isLogin ? HAVE_ACCOUNT : NO_ACCOUNT}
              </span>
              <Link
                className="link"
                to={!isLogin ? "/login" : "/login/register"}
              >
                {!isLogin ? LOGIN : REGISTER}
              </Link>
            </div>

            <div className="mt-4">
              <Link className="link" to="/login/lost">
                {LOST_PASSWORD}
              </Link>
            </div>
          </>
        )}
      </>
    </div>
  )
}

export default LoginRegisterLost
