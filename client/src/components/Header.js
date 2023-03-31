import * as React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { isLoggedIn } from "../store/slices/user"

import useDocumentTitle from "../hooks/use-document-title"
import { TITLE } from "../lang/en-gb"

import HeaderMenu from "./HeaderMenu"

function Header({ title, className }) {
  useDocumentTitle(title || TITLE)

  const userLoggedIn = useSelector(isLoggedIn)

  return (
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
          <HeaderMenu style={{ position: "relative", zIndex: "100" }} />
        )}
        {!userLoggedIn && (
          <Link to="/login" className="link">
            User
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
