import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import AddService from "../pages/AddService/AddService";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/dashboard/add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/registration",
        Component: Registration,
      },
    ],
  },

  {
    path: "/*",
    Component: NotFound,
  },
]);

export default router;
