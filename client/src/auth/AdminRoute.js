import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/api";

const AdminRoute = ({ children }) => {
  const { location } = useLocation();
  return isAuthenticated() && isAuthenticated().role === "admin" ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: isAuthenticated().role === "doctor" ? "/doctor" : "/",
        state: { from: location },
      }}
    />
  );
};

export default AdminRoute;
