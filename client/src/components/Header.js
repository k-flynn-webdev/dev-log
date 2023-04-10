import * as React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { isLoggedIn, getUserName, getUserDetails } from "../store/slices/user"

import useDocumentTitle from "../hooks/use-document-title"
import { TITLE } from "../lang/en-gb"

import HeaderMenu from "./HeaderMenu"
import HeaderUser from "./HeaderUser"

function Header({ title, className }) {
  useDocumentTitle(title || TITLE)

  const userLoggedIn = useSelector(isLoggedIn)
  const userName = useSelector(getUserName)
  const userDetails = useSelector(getUserDetails)

  const [profileOpen, setProfileOpen] = useState(false)

  const handleClick = () => {
    setProfileOpen(!profileOpen)
  }

  return (
    <div className="header">
      {profileOpen && (
        <HeaderMenu
          userName={userName}
          userDetails={userDetails}
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

          <>
            {userLoggedIn && (
              <HeaderUser userName={userName} onClick={handleClick} />
            )}
            {!userLoggedIn && (
              <Link to="/login" className="link">
                User
              </Link>
            )}
          </>
        </div>
      }
    </div>
  )
}

export default Header
