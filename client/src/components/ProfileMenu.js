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
      <div className="profile-menu__header">
        <h1 className="title">{userName}</h1>
        <button className="close-button" onClick={onClick}>
          <svg
            xmlSpace="preserve"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            clipRule="evenodd"
            viewBox="0 0 16 16"
            className="icon:2 icon-close"
          >
            <path d="M5.9219 6.1694h-5.11c-.22 0-.39.176-.39.392v3.217c0 .216.17.391.39.391h5.11v5.109c0 .216.17.391.39.391h3.22c.21 0 .39-.175.39-.391v-5.109h5.11c.21 0 .39-.175.39-.391v-3.217c0-.216-.18-.392-.39-.392h-5.11v-5.108c0-.216-.18-.392-.39-.392h-3.22c-.22 0-.39.176-.39.392v5.108Z" />
          </svg>
        </button>
      </div>

      <div className="profile-menu__content">
        <div>11</div>
        <button className="quit-button" onClick={logoutUser}>
          {LOGOUT}
        </button>
      </div>
    </div>
  )
}

export default ProfileMenu
