import { Navigate } from "react-router-dom";
import { useAuth } from "../context/fakeAuthContext";

const ProtectRoute = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectRoute;
