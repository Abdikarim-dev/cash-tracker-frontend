// ["ADMIN"]
// ["ADMIN",STAFF]
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ["ADMIN","STAFF"]
const ProtectedRoute = ({ allowedRoles }) => {
  const {
    state: { isAuthenticated, user },
  } = useAuth();

  if (!isAuthenticated) return <Navigate to={"/"} />;

  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={"/dashboard"}/>;
  return <Outlet />;
};

export default ProtectedRoute;