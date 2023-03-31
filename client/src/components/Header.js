import * as React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { isLoggedIn, getUserName } from "../store/slices/user"

import useDocumentTitle from "../hooks/use-document-title"
import { TITLE } from "../lang/en-gb"

import ProfileMenu from "./ProfileMenu"
import ProfileButton from "./ProfileButton"

function Header({ title, className }) {
  useDocumentTitle(title || TITLE)

  const userLoggedIn = useSelector(isLoggedIn)
  const userName = useSelector(getUserName)

  const [profileOpen, setProfileOpen] = useState(false)

  const handleClick = () => {
    setProfileOpen(!profileOpen)
  }

  return (
    <div>
      {profileOpen && <ProfileMenu userName={userName} onClick={handleClick} />}

      {!profileOpen && (
        <div className={`${className ? className : ""} header`}>
          <div className="flex-grow">
            <div className="text-center mb-4">
              <Link className="title text-5xl link" to="/">
                {title || TITLE}
              </Link>
            </div>
          </div>

          <div>
            {userLoggedIn && (
              <ProfileButton userName={userName} onClick={handleClick} />
            )}
            {!userLoggedIn && (
              <Link to="/login" className="link">
                User
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
