import * as React from "react"
import { useEffect, useRef } from "react"
import Log from "./Log"

import { getLogs, logList } from "../store/slices/logs"
import { getUserID } from "../store/slices/user"

import { useSelector, useDispatch } from "react-redux"

function Logs() {
  const dispatch = useDispatch()
  const effectRan = useRef(false)
  const userId = useSelector(getUserID)
  const logs = useSelector(logList)
  const LogListRender = logs.map(item => <Log key={item.id} log={item} />)

  useEffect(() => {
    if (!userId) return
    if (!effectRan.current) {
      dispatch(getLogs()).unwrap()

      return () => {
        effectRan.current = true
      }
    }
  }, [userId])

  return <div>{LogListRender}</div>
}

export default Logs
