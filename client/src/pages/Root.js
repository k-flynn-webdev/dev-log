import * as React from "react"
import Header from "../components/Header"
import Error from "../components/Error"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import useMountProfile from "../hooks/use-mount-profile"
import useAccessTokenURL from "../hooks/use-access-token-url"

const Root = () => {
  useMountProfile()
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
