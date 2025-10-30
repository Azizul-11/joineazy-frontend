import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return user.role === role ? children : <Navigate to={`/${user.role}`} />;
};

export default RoleBasedRoute;
