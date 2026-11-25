import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { church } from '../../config/church';
import { primaryNav, giveLink, utilityFacts } from './navData';
import NavDropdown from './NavDropdown';

/**
 * Global site header.
 *
 * Structure mirrors navData.js top-to-bottom:
 *   1. thin utility bar (service times, address)
 *   2. main bar: brand (→ /), primary nav, Give button
 *
 * The header is sticky. On mobile the primary nav collapses into a drawer
 * behind the hamburger, while the Give button stays in the bar.
 */
const NavBar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Key of the nav item last hovered or focused; only that dropdown may be open.
  const [currentKey, setCurrentKey] = useState(null);

  const closeMobile = () => setMobileOpen(false);
  const isActive = (href) => href && href !== '#' && location.pathname === href;

  // Any route change closes the drawer.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll and allow Escape to close while the drawer is open.
  useEffect(() => {
    document.body.classList.toggle('nav-drawer-open', mobileOpen);
    if (!mobileOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('nav-drawer-open');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      {/* 1. Utility bar */}
      <div className="utility-bar">
        <div className="utility-inner">
          <p className="utility-facts">
            {utilityFacts.map((fact) => (
              <span key={fact.label} className="utility-fact">
                <span className="utility-fact-label">{fact.label}:</span> {fact.value}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* 2. Main bar */}
      <div className="main-bar">
        <div className="main-inner">
          <Link
            to="/"
            className="brand"
            onClick={closeMobile}
            aria-label={`${church.name} — home`}
          >
            <img src="/zcbc-icon.png" alt="" className="brand-logo" />
            <span className="brand-name">{church.name}</span>
          </Link>

          <nav
            id="primary-navigation"
            className={`primary-nav ${mobileOpen ? 'open' : ''}`}
            aria-label="Primary"
          >
            <ul className="nav-list">
              {primaryNav.map((item) =>
                item.children ? (
                  <NavDropdown
                    key={item.key}
                    item={item}
                    isActive={isActive}
                    isCurrent={currentKey === item.key}
                    onActivate={() => setCurrentKey(item.key)}
                    onNavigate={closeMobile}
                  />
                ) : (
                  <li
                    key={item.key}
                    className="nav-item"
                    onMouseEnter={() => setCurrentKey(item.key)}
                    onFocus={() => setCurrentKey(item.key)}
                  >
                    <Link
                      to={item.href}
                      className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="header-actions">
            {/* Give stays in the bar on every breakpoint — outside the drawer. */}
            <Link to={giveLink.href} className="give-button" onClick={closeMobile}>
              {giveLink.label}
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="primary-navigation"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span
                className={`hamburger ${mobileOpen ? 'open' : ''}`}
                aria-hidden="true"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop closes the drawer on tap; hidden from the accessibility tree. */}
      {mobileOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeMobile}
        />
      )}
    </header>
  );
};

export default NavBar;
