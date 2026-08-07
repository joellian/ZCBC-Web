import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { church } from '../../config/church';
import { menuConfig } from './navData';
import ExpandedMenu from './ExpandedMenu';

const NavBar = () => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const closeAll = () => {
    setExpandedMenu(null);
    setMobileMenuOpen(false);
  };

  const toggleExpanded = (key) => setExpandedMenu((open) => (open === key ? null : key));

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
    setExpandedMenu(null);
  };

  // Lock body scroll while the mobile menu covers the page.
  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [mobileMenuOpen]);

  // Close everything on a click outside the header, or on Escape.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) closeAll();
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeAll();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Any route change closes the menus — otherwise they stay open behind the
  // new page after an in-menu navigation.
  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  const headerClasses = [
    'header-container',
    expandedMenu && 'expanded',
    mobileMenuOpen && 'mobile-open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClasses} ref={navRef}>
      <nav className="main-nav">
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className={`nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="header-item church-logo">
            <Link to="/" onClick={closeAll}>
              <img src="/zcbc-icon.png" alt={`${church.name} logo`} />
            </Link>
          </li>
          <li className="header-item church-name">
            <Link to="/" onClick={closeAll}>
              {church.name.toUpperCase()}
            </Link>
          </li>

          {menuConfig.map((menu) =>
            menu.items ? (
              <li
                key={menu.key}
                className={`header-item expandable ${expandedMenu === menu.key ? 'active' : ''}`}
              >
                {/* On mobile the label navigates; on desktop it opens the
                    mega-menu. Two elements, toggled by CSS. */}
                <Link
                  to={menu.path}
                  className={`expandable-trigger mobile-link ${isActive(menu.path) ? 'active' : ''}`}
                  onClick={closeAll}
                >
                  {menu.label}
                </Link>
                <button
                  type="button"
                  className={`expandable-trigger desktop-trigger ${isActive(menu.path) ? 'active' : ''}`}
                  onClick={() => toggleExpanded(menu.key)}
                  aria-expanded={expandedMenu === menu.key}
                >
                  {menu.label}
                  <span
                    className={`expand-arrow ${expandedMenu === menu.key ? 'rotated' : ''}`}
                    aria-hidden="true"
                  >
                    &#9660;
                  </span>
                </button>
              </li>
            ) : (
              <li key={menu.key} className="header-item">
                <Link
                  to={menu.path}
                  className={isActive(menu.path) ? 'active' : ''}
                  onClick={closeAll}
                >
                  {menu.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      {menuConfig
        .filter((menu) => menu.items)
        .map((menu) => (
          <ExpandedMenu
            key={menu.key}
            menu={menu}
            isOpen={expandedMenu === menu.key}
            onClose={closeAll}
          />
        ))}
    </header>
  );
};

export default NavBar;
