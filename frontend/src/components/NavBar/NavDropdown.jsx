import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * One top-level nav item that owns a mega-menu.
 *
 * Opening is driven by a single derived flag so hover and keyboard focus behave
 * identically:
 *
 *   open = (hovered || focused) && !dismissed
 *
 * - hover  → pointer users get the menu on mouse-enter.
 * - focus  → keyboard users get it the moment the trigger (or any child) holds
 *            focus, so Tab can then walk the children in DOM order.
 * - Escape → sets `dismissed`, closing the menu even while it is still hovered
 *            or focused, and returns focus to the trigger. Moving away and back
 *            clears the flag so the menu can reopen.
 *
 * On mobile the CSS lays the children out as a static sub-list, so this state
 * only governs the desktop pop-out.
 */
const NavDropdown = ({ item, isActive, onNavigate }) => {
  const itemRef = useRef(null);
  const triggerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const open = (hovered || focused) && !dismissed;

  const handleFocus = () => {
    setFocused(true);
    setDismissed(false);
  };

  // Only close when focus actually leaves the item — moving between the trigger
  // and its children keeps relatedTarget inside, so the menu stays open.
  const handleBlur = (event) => {
    if (!itemRef.current?.contains(event.relatedTarget)) {
      setFocused(false);
      setDismissed(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && open) {
      setDismissed(true);
      setHovered(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <li
      ref={itemRef}
      className={`nav-item has-dropdown ${open ? 'open' : ''}`}
      onMouseEnter={() => {
        setHovered(true);
        setDismissed(false);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link
        to={item.href}
        ref={triggerRef}
        className={`nav-link dropdown-trigger ${isActive(item.href) ? 'active' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onNavigate}
      >
        {item.label}
        <span className="caret" aria-hidden="true" />
      </Link>

      <div className="dropdown" role="region" aria-label={`${item.label} menu`}>
        <ul className="dropdown-list">
          {item.children.map((child) => (
            <li key={child.label} className="dropdown-item">
              <Link to={child.href} className="dropdown-link" onClick={onNavigate}>
                <span className="dropdown-label">{child.label}</span>
                <span className="dropdown-desc">{child.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default NavDropdown;
