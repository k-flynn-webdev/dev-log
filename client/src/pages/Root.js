import * as React from "react"
import Header from "../components/Header"
import Error from "../components/Error"
import Footer from "../components/Footer"
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
      <div className="min-content-height container:md">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Root
