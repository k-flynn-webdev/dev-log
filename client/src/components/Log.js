import * as React from "react"
import Tags from "./Tags"
import LogDate from "./LogDate"
import LogMenu from "./LogMenu"

function Log({ log }) {
  return (
    <div className="log" title={log.value}>
      <div>
        <div className="log-text">
          <p>{log.value}</p>
        </div>

        <div className="log-tags">
          <Tags tags={log.tags} />
        </div>

        <LogDate created_at={log.created_at} />

        <LogMenu />
      </div>
    </div>
  )
}

export default Log
