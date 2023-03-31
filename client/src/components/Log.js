import * as React from "react"
import Tags from "./Tags"
import LogDate from "./LogDate"
import LogMenu from "./LogMenu"

function Log({ log }) {
  return (
    <div>
      <div className={`log ${log.tags.length ? "" : "mb-3"}`} title={log.value}>
        <div className="log-text">
          <p>{log.value}</p>
        </div>

        <LogDate created_at={log.created_at} />

        <LogMenu />
      </div>

      <Tags tags={log.tags} />
    </div>
  )
}

export default Log
