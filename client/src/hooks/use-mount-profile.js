import * as React from "react"
import { useDispatch } from "react-redux"
import { fetchProfile } from "../store/slices/profile"
import { getStorageAccessToken } from "../helpers/authentication"
import { useEffect, useRef } from "react"
import { authSet } from "../plugins/http"

function useMountProfile() {
  const dispatch = useDispatch()
  const effectRan = useRef(false)
  const accessTokenKey = getStorageAccessToken()

  useEffect(() => {
    if (!effectRan.current) {
      if (accessTokenKey && accessTokenKey.length) {
        authSet(accessTokenKey)
        dispatch(fetchProfile())

        return () => {
          effectRan.current = true
        }
      }
    }
  }, [])

  return null
}

export default useMountProfile
