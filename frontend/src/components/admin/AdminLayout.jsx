import { Link, NavLink, Outlet } from 'react-router-dom';
import './Admin.css';
import { useAuth } from '../../hooks/useAuth';
import { resourceList } from './resourceConfig';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-left">
          <strong>Church Admin</strong>
          <nav className="admin-nav">
            {resourceList.map((resource) => (
              <NavLink
                key={resource.key}
                to={resource.basePath}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {resource.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="admin-header-right">
          {user && <span className="admin-muted">{user.email || user.username}</span>}
          <Link to="/" className="admin-btn admin-btn-ghost">
            View site
          </Link>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
