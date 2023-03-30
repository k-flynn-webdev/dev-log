import * as React from "react"
import { useLocation } from "react-router-dom"
import { REGISTER, LOGIN } from "../lang/en-gb"
import LoginRegister from "../components/LoginRegister"
import LoginGoogle from "../components/LoginGoogle"
import LoginGithub from "../components/LoginGithub"

function LoginPage() {
  const location = useLocation().pathname
  const isLogin = location === "/login"
  const isRegister = location === "/login/register"

  const form = isLogin || isRegister ? <LoginRegister isLogin={isLogin} /> : ""

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
          <div className="socials-bar mb-4">
            <LoginGoogle />
            <LoginGithub />
          </div>

          <hr className="solid my-8" />

          <div>{form}</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
