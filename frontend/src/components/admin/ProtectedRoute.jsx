import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Gate for every /admin route.
 *
 * This is a convenience guard, not a security boundary — the real check is
 * Strapi refusing unauthenticated writes. Never rely on hiding UI alone.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Wait for the stored token to be validated, or a refresh would bounce a
  // logged-in admin to the login screen.
  if (isLoading) return <div className="loading">Checking your session…</div>;

  if (!isAuthenticated) {
    // Remember where they were headed so login can send them back.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
