import { useContext } from "react";
import { Navigate } from "react-router-dom";


import UserAuthContext from "../../Context/UserAuthContext";
import Loader from "../../components/Loader/Loader";

const RoleRoute = ({ children, allowedRole }) => {
  const { userRole, loading } = useContext(UserAuthContext);

  
  if (loading || !userRole) return <Loader />;

  // Normalize to array
  const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];

  if (!roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;