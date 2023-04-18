import * as React from "react"

function LogText({ log }) {
  return (
    <div className="log-text">
      <p>{log.value}</p>
    </div>
  )
}

export default LogText
