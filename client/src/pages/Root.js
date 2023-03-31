import * as React from "react"
import Header from "../components/Header"
import Error from "../components/Error"
import { Outlet } from "react-router-dom"
import useMountUser from "../hooks/use-mount-user"
import useAccessTokenURL from "../hooks/use-access-token-url"

const Root = () => {
  useMountUser()
  useAccessTokenURL()

  return (
    <>
      <div className="container:lg">
        <Header />
        <Error />
      </div>

      <div className="container:md">
        <Outlet />
      </div>
    </>
  )
}

export default Root
