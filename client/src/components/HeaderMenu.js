import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserName, resetUser } from "../store/slices/user"
import { resetLogs } from "../store/slices/logs"
import { Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react"
import { authRemove } from "../plugins/http"
import { clearStorageAccessToken } from "../helpers/authentication"
import { LOGOUT } from "../lang/en-gb"
import ProfileButton from "./ProfileButton"

function Header() {
  const dispatch = useDispatch()
  const userName = useSelector(getUserName)
  const navigate = useNavigate()

  const logoutUser = () => {
    authRemove()
    clearStorageAccessToken()
    dispatch(resetUser())
    dispatch(resetLogs())
    navigate("/")
  }

  return (
    <ProfileButton userName={userName} onClick={logoutUser} />
    // <Menu style={{ position: "relative", zIndex: "100" }}>
    //   <MenuButton as={}></MenuButton>

    //   <MenuList rootProps={{ position: "relative", zIndex: "100" }}>
    //     <MenuItem onClick={logoutUser}>{LOGOUT}</MenuItem>
    //   </MenuList>
    // </Menu>
  )
}

export default Header
