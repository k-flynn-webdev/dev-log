import * as React from "react"
import { DATE_MONTHS, TIME_AM, TIME_PM } from "../lang/en-gb"

export const getDate = input => {
  if (!input) return ["", ""]
  const dateObj = new Date(input)
  return [getDateShort(dateObj), getDateLong(dateObj)]
}

export const getDateShort = input => {
  if (!input) return ""
  const AM_PM = input.getHours() < 13 ? TIME_AM : TIME_PM
  return `${input.getDate()} ${DATE_MONTHS[input.getMonth()]} ${AM_PM}`
}

export const getDateLong = input => {
  if (!input) return ""
  return input.toLocaleString()
}

function LogDate({ log }) {
  const [dateShort, dateLong] = getDate(log.created_at)

  return (
    <div className="log-date" title={dateLong}>
      {dateShort}
    </div>
  )
}

export default LogDate
