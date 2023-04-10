import * as React from "react"
import { useSelector } from "react-redux"
import { isLoggedIn } from "../store/slices/profile"

import LogInput from "../components/LogInput"
import Logs from "../components/Logs"
import Splash from "./Splash"

function Home() {
  const profileExists = useSelector(isLoggedIn)

  return (
    <>
      {!profileExists && <Splash />}
      {profileExists && (
        <>
          <LogInput />
          <Logs />
        </>
      )}
    </>
  )
}

export default Home
