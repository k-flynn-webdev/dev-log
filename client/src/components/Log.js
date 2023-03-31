import * as React from "react"
import Tags from "./Tags"
import LogDate from "./LogDate"
import LogMenu from "./LogMenu"

export const getMarginSpace = log => {
  const hasTags = log.tags.length ? 1 : 0
  const rows = Math.ceil(log.tags.length / 3)
  const result = (hasTags + rows) * 2
  return `mb-${log.tags.length ? result + 1 : 2}`
}

function Log({ log }) {
  return (
    <div className={`log ${getMarginSpace(log)}`} title={log.value}>
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
