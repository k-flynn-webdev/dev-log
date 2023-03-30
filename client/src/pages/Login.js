import * as React from "react"
import { useLocation } from "react-router-dom"
import { Box, Card, CardHeader, CardBody } from "@chakra-ui/react"
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
    <Box className="login">
      <Card maxW="sm" className="login__card mb-2 mx-auto">
        <CardHeader>
          <h1 className="text-center text-3xl">
            {isLogin && LOGIN}
            {isRegister && REGISTER}
          </h1>
        </CardHeader>

        <CardBody className="p-4">
          <div className="socials-bar mb-4">
            <LoginGoogle />
            <LoginGithub />
          </div>

          <hr className="solid my-8" />

          <div>{form}</div>
        </CardBody>
      </Card>
    </Box>
  )
}

export default LoginPage
