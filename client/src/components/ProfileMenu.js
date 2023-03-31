import * as React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { resetUser } from "../store/slices/user"
import { resetLogs } from "../store/slices/logs"
import { authRemove } from "../plugins/http"
import { clearStorageAccessToken } from "../helpers/authentication"
import { LOGOUT } from "../lang/en-gb"

function ProfileMenu({ userName, onClick }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    onClick()
    authRemove()
    clearStorageAccessToken()
    dispatch(resetUser())
    dispatch(resetLogs())
    navigate("/")
  }

  return (
    <div className="profile-menu">
      <h1>{userName}</h1>
      <button onClick={logoutUser}>{LOGOUT}</button>
      <br />
      <button onClick={onClick}>X</button>
    </div>
  )
}

export default ProfileMenu
