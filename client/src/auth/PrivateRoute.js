import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, isTokenValid } from "../api/api";

const PrivateRoute = ({ children }) => {
  const { location } = useLocation();

  return isAuthenticated().role !== "admin" && isTokenValid() ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: isAuthenticated().role === "admin" ? "/admin" : "/",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
