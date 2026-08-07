import { Link } from 'react-router-dom';

const ExpandedMenu = ({ menu, isOpen, onClose }) => (
  <div className={`expanded-menu ${isOpen ? 'show' : ''}`} aria-hidden={!isOpen}>
    <div className="expanded-content">
      <div className="expanded-header">
        <div className="header-content">
          <h2>{menu.headerTitle}</h2>
          <p>{menu.headerDescription}</p>
        </div>
        <div className="header-image">
          <div className="church-icon" aria-hidden="true">
            {menu.headerIcon}
          </div>
        </div>
      </div>

      <div className="expanded-sections">
        <div className="sections-grid">
          {menu.items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="section-card"
              onClick={onClose}
            >
              <div className="card-icon">
                <span className="icon" aria-hidden="true">
                  {item.icon}
                </span>
              </div>
              <div className="card-content">
                <h3>{item.label}</h3>
                <p>{item.description}</p>
                <span className="card-arrow">{menu.ctaArrowLabel} &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="expanded-footer">
        <div className="footer-content">
          <Link to={menu.path} className="main-page-link" onClick={onClose}>
            <span>{menu.ctaLabel}</span>
            <span className="footer-arrow">&rarr;</span>
          </Link>
          <div className="footer-text">
            <p>{menu.footerText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ExpandedMenu;
