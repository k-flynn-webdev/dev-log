import * as React from "react"
import { REGISTER, LOGIN, LOST } from "../lang/en-gb"
import LoginRegisterLost from "../components/LoginRegisterLost"
import LoginGoogle from "../components/LoginGoogle"
import LoginGithub from "../components/LoginGithub"

function LoginPage({ state }) {
  const form = <LoginRegisterLost state={state} />

  const isLogin = state === "login"
  const isRegister = state === "register"
  const isVerify = state === "verify"
  const isLost = state === "lost"

  return (
    <div className="login">
      <div className="mx-auto card:sm">
        <div className="card__header">
          <h1 className="text-center">
            {isLogin && LOGIN}
            {isRegister && REGISTER}
          </h1>
        </div>

        <div className="card__body">
          <>
            {(isLogin || isRegister) && (
              <div className="socials-bar mb-4">
                <LoginGoogle />
                <LoginGithub />
              </div>
            )}
          </>

          {(isLogin || isRegister) && <hr className="solid my-8" />}

          <div>{form}</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
