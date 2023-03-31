import * as React from "react"

function LogMenu({ log }) {
  return (
    <button className="log-menu">
      <svg
        xmlSpace="preserve"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        clipRule="evenodd"
        viewBox="0 0 13 4"
        className="icon:2"
      >
        <path
          fillRule="nonzero"
          d="M4.9298 3.712V.6267H8.015V3.712H4.9298Zm-4.8522 0V.6267H3.163V3.712H.0776Zm9.3742 0V.6267h3.0853V3.712H9.4518Z"
        />
      </svg>
    </button>
  )
}

export default LogMenu
