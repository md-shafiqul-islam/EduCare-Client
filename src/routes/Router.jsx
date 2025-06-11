import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import NotFound from "../pages/NotFound/NotFound";

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
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);

export default router;
