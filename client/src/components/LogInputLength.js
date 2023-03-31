import * as React from "react"
import { progressValue, isValidLogLength } from "../helpers/log-input"

function LogInputLength({ logValue }) {
  const logValueLength = logValue.trim().length || 0
  const value = progressValue(logValueLength)
  const isValidClass = isValidLogLength(logValueLength) ? "" : "invalid"

  return (
    <div
      className={`log__input-progress ${isValidClass}`}
      style={{ width: `${value}%` }}
    />
  )
}

export default LogInputLength
