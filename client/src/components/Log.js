import * as React from "react"
import Tags from "./Tags"

import { DATE_MONTHS, TIME_AM, TIME_PM } from "../lang/en-gb"

const getDateShort = input => {
  if (!input) return ""

  const dateObj = new Date(input)
  const AM_PM = dateObj.getHours() < 13 ? TIME_AM : TIME_PM
  return `${dateObj.getDate()} ${DATE_MONTHS[dateObj.getMonth()]} ${AM_PM}`
}

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

        <div className="log-date" title={log.created_at}>
          {getDateShort(log.created_at)}
        </div>

        <button className="log-menu">
          <svg viewBox="0 0 32 32" className="icon" aria-hidden="true">
            <path d="M1 7.5h30V1.9H1v5.6zm0 22.6h30v-5.6H1v5.6zm0-11.3h30v-5.6H1v5.6z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Log
