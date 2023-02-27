import { createBrowserRouter } from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
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
      { path: "", element: <Login /> },
      { path: "register", element: <Login /> },
      { path: "verify/:token", element: <Login /> },
    ],
  },
]);

export default router;