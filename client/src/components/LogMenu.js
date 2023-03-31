import * as React from "react"

function LogMenu({ log }) {
  return (
    <button className="log-menu">
      <svg viewBox="0 0 32 32" className="icon" aria-hidden="true">
        <path d="M1 7.5h30V1.9H1v5.6zm0 22.6h30v-5.6H1v5.6zm0-11.3h30v-5.6H1v5.6z"></path>
      </svg>
    </button>
  )
}

export default LogMenu
