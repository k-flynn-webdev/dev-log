import * as React from "react"

export const getShortProfileName = name => {
  return name.substring(0, 4)
}

function HeaderProfile({ profileName, onClick }) {
  const name = profileName ? profileName : "??"

  return (
    <div className="header__content__profile mt-3">
      <span className="cursor" onClick={onClick}>
        <span className="hide:sm header__content__profile-name">{name}</span>
        <span className="hide show@sm header__content__profile-name">
          {getShortProfileName(name)}
        </span>
      </span>

      <button className="header__content__profile-button" onClick={onClick}>
        <svg
          xmlSpace="preserve"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="0 0 15 20"
          className="icon:2"
        >
          <path d="M.1265 17.0791c-.01-.06-.01-.121-.01-.182 0-2.726 1.52-5.1 3.76-6.322v-.525c-1.11-.963-1.81-2.382-1.81-3.963 0-2.898 2.36-5.252 5.25-5.252 2.9 0 5.26 2.354 5.26 5.252 0 1.581-.7 3-1.81 3.963v.525c2.24 1.222 3.75 3.596 3.75 6.322v.182c-1.94 1.648-4.45 2.643-7.2 2.643-2.74 0-5.25-.995-7.19-2.643Z" />
        </svg>
      </button>
      <div className="hide show:md mr-2" />
    </div>
  )
}

export default HeaderProfile
