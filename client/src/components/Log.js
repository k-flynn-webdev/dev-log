import * as React from "react"
import Tags from "./Tags"
import LogText from "./LogText"
import LogEdit from "./LogEdit"
import LogDate from "./LogDate"
import LogMenu from "./LogMenu"

function Log({ log }) {
  return (
    <div>
            <LogText log={log} />
          )}
        <LogDate log={log} />
        <LogMenu isOpen={isOpen} handleIsOpen={handleMenuClick} />
        </div>

      <Tags log={log} />
    </div>
  )
}

export default Log
