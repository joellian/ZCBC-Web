import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './Admin.css';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/admin/sermons';

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(credentials.identifier, credentials.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Could not sign in. Check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-card admin-login-form" onSubmit={handleSubmit}>
        <h1>Admin Sign In</h1>
        <p className="admin-muted">Church staff only.</p>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
          </div>
        )}

        <div className="admin-field">
          <label htmlFor="identifier">Email or username</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            value={credentials.identifier}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
