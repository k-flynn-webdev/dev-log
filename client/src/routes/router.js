import { createBrowserRouter } from "react-router-dom"

import Root from "../pages/Root"
import Home from "../pages/Home"
import LoginPage from "../pages/Login"
import Error from "../pages/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "login",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <LoginPage state="login" /> },
      { path: "register", element: <LoginPage state="register" /> },
      { path: "verify/:token", element: <LoginPage state="verify" /> },
      { path: "lost", element: <LoginPage state="lost" /> },
    ],
  },
])

export default router
