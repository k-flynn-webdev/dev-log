import * as React from "react"

function LogMenu({ isOpen, handleIsOpen }) {
  return (
    <button className="log-menu" onClick={handleIsOpen}>
      <svg
        xmlSpace="preserve"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        clipRule="evenodd"
        viewBox="0 0 13 13"
        className="icon:2"
      >
        {isOpen ? (
          <path d="M12.5402.0442H.5416l11.9986 11.9999V.0442Z" />
        ) : (
          <path
            fillRule="nonzero"
            d="M4.9298 3.712V.6267H8.015V3.712H4.9298Zm-4.8522 0V.6267H3.163V3.712H.0776Zm9.3742 0V.6267h3.0853V3.712H9.4518Z"
          />
        )}
      </svg>
    </button>
  )
}

export default LogMenu
