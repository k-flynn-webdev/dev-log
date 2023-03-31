import * as React from "react"
import { useSelector } from "react-redux"
import { isLoggedIn } from "../store/slices/user"

import LogInput from "../components/LogInput"
import Logs from "../components/Logs"
import Splash from "./Splash"

function Home() {
  const userExists = useSelector(isLoggedIn)

  return (
    <>
      {!userExists && <Splash />}
      {userExists && (
        <>
          <LogInput />
          <Logs />
        </>
      )}
    </>
  )
}

export default Home
