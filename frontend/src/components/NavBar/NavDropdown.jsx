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
 * The parent also tracks which nav item the user most recently hovered or
 * focused (`isCurrent`). Only that item may show its menu, so clicking one
 * dropdown (which leaves it focused) and then hovering another closes the first.
 *
 * On mobile the CSS lays the children out as a static sub-list, so this state
 * only governs the desktop pop-out.
 */
const NavDropdown = ({ item, isActive, isCurrent, onActivate, onNavigate }) => {
  const itemRef = useRef(null);
  const triggerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const open = (hovered || focused) && !dismissed && isCurrent;

  const handleFocus = () => {
    setFocused(true);
    setDismissed(false);
    onActivate();
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
        onActivate();
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
