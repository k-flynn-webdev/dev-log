import * as React from "react"
import { SIGNUP, LOGIN } from "../lang/en-gb"
import LoginForm from "../components/LoginForm"
import LoginGoogle from "../components/LoginGoogle"
import LoginGithub from "../components/LoginGithub"

function LoginPage({ state }) {
  const form = <LoginForm state={state} />

  const isLogin = state === "login"
  const isSignUp = state === "signup"
  const isVerify = state === "verify-email"
  const isForgotPassword = state === "forgot-password"
  const isChangePassword = state === "change-password"

  return (
    <div className="login">
      <div className="mx-auto card:sm">
        <div className="card__header">
          <h1 className="text-center">
            {isLogin && LOGIN}
            {isSignUp && SIGNUP}
          </h1>
        </div>

        <div className="card__body">
          <>
            {(isLogin || isSignUp) && (
              <div className="socials-bar mb-4">
                <LoginGoogle />
                <LoginGithub />
              </div>
            )}
          </>

          {(isLogin || isSignUp) && <hr className="solid my-8" />}

          <div>{form}</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
