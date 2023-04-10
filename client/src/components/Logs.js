import * as React from "react"
import { useEffect, useRef } from "react"
import Log from "./Log"

import { getLogs, logList } from "../store/slices/logs"
import { getProfileID } from "../store/slices/profile"

import { useSelector, useDispatch } from "react-redux"

function Logs() {
  const dispatch = useDispatch()
  const effectRan = useRef(false)
  const profileId = useSelector(getProfileID)
  const logs = useSelector(logList)
  const LogListRender = logs.map(item => <Log key={item.id} log={item} />)

  useEffect(() => {
    if (!profileId) return
    if (!effectRan.current) {
      dispatch(getLogs()).unwrap()

      return () => {
        effectRan.current = true
      }
    }
  }, [profileId])

  return <div>{LogListRender}</div>
}

export default Logs
