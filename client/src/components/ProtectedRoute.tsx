import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
