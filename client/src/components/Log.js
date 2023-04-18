import * as React from "react"
import Tags from "./Tags"
import LogText from "./LogText"
import LogEdit from "./LogEdit"
import LogDate from "./LogDate"
import LogMenu from "./LogMenu"
import { useState } from "react"

function Log({ log }) {
  const [isOpen, setOpen] = useState(false)
  const classNames = `log ${log.tags.length ? "" : "mb-3"} ${
    isOpen ? "open" : ""
  }`

  const handleMenuClick = () => {
    setOpen(!isOpen)
  }

  return (
    <div>
      <div className={classNames} title={log.value}>
        <>
          {isOpen ? (
            <LogEdit log={log} handleIsOpen={handleMenuClick} />
          ) : (
            <LogText log={log} />
          )}
        </>
        <LogDate log={log} />
        <LogMenu isOpen={isOpen} handleIsOpen={handleMenuClick} />
      </div>

      <Tags log={log} />
    </div>
  )
}

export default Log
