import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
    ],
  },
  {
    path: "login",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "register", element: <LoginPage /> },
      { path: "verify/:token", element: <LoginPage /> },
      { path: "recover", element: <LoginPage /> },
    ],
  },
]);

export default router;