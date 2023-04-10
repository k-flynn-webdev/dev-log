import * as React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  isLoggedIn,
  getProfileName,
  getProfileDetails,
} from "../store/slices/profile"

import useDocumentTitle from "../hooks/use-document-title"
import { TITLE } from "../lang/en-gb"

import HeaderMenu from "./HeaderMenu"
import HeaderProfile from "./HeaderProfile"

function Header({ title, className }) {
  useDocumentTitle(title || TITLE)

  const profileLoggedIn = useSelector(isLoggedIn)
  const profileName = useSelector(getProfileName)
  const profileDetails = useSelector(getProfileDetails)

  const [profileOpen, setProfileOpen] = useState(false)

  const handleClick = () => {
    setProfileOpen(!profileOpen)
  }

  return (
    <div className="header">
      {profileOpen && (
        <HeaderMenu
          profileName={profileName}
          profileDetails={profileDetails}
          onClick={handleClick}
        />
      )}

      {
        <div
          className={`${profileOpen ? "open" : ""}${
            className ? className : ""
          } header__content `}
        >
          <div className="flex-grow text-center mb-4">
            <Link className="title link" to="/">
              {title || TITLE}
            </Link>
          </div>

          <div>
            {profileLoggedIn && (
              <HeaderProfile profileName={profileName} onClick={handleClick} />
            )}
            {!profileLoggedIn && (
              <Link to="/login" className="link">
                Profile
              </Link>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default Header
