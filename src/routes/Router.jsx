import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllServices from "../pages/AllServices/AllServices";
import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import AddService from "../pages/AddService/AddService";
import axios from "axios";
import Spinner from "../components/Spinner";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Spinner />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-services",
        loader: () => axios("http://localhost:3000/all-services"),
        Component: AllServices,
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
