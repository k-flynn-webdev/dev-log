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
      { path: "signup", element: <LoginPage state="signup" /> },
      {
        path: "verify-email",
        element: <LoginPage state="verify-email" />,
      },
      {
        path: "forgot-password",
        element: <LoginPage state="forgot-password" />,
      },
      {
        path: "reset-password",
        element: <LoginPage state="reset-password" />,
      },
      {
        path: "change-password",
        element: <LoginPage state="change-password" />,
      },
    ],
  },
])

export default router
