import * as React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { resetProfile } from "../store/slices/profile"
import { resetLogs } from "../store/slices/logs"
import { authRemove } from "../plugins/http"
import { clearStorageAccessToken } from "../helpers/authentication"
import { LOGOUT } from "../lang/en-gb"
import ProfileDetails from "./ProfileDetails"

function HeaderMenu({ profileName, profileDetails, onClick }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutProfile = () => {
    onClick()
    authRemove()
    clearStorageAccessToken()
    dispatch(resetProfile())
    dispatch(resetLogs())
    navigate("/")
  }

  return (
    <div className="header__content__menu">
      <div className="header__content__menu-title">
        <h1 className="title">{profileName}</h1>
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

      <div className="header__content__menu-body mt-4">
        <ProfileDetails profileDetails={profileDetails} />
        <button className="quit-button" onClick={logoutProfile}>
          {LOGOUT}
        </button>
      </div>
    </div>
  )
}

export default HeaderMenu
