import { Navigate, useLocation } from "react-router";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
