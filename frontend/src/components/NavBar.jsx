import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const location = useLocation();
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    
    // About Us sections with descriptions
    const aboutUsItems = [
        {
            label: 'Leadership',
            href: '/about-us#leadership',
            description: 'Meet our dedicated pastors and church leaders who guide our community with wisdom and faith.',
            icon: '👥'
        },
        {
            label: 'Who We Are',
            href: '/about-us#who-we-are',
            description: 'Discover our mission, values, and what makes our church community unique in faith.',
            icon: '✝️'
        },
        {
            label: 'Our Story',
            href: '/about-us#our-story',
            description: 'Learn about our church history and the journey that brought us to where we are today.',
            icon: '📖'
        },
        {
            label: 'What We Do',
            href: '/about-us#what-we-do',
            description: 'Explore our ministries, services, and how we serve our community and spread God\'s love.',
            icon: '🙏'
        }
    ];

    // Sermons sections
    const sermonsItems = [
        {
            label: 'Recent Messages',
            href: '/sermons#recent',
            description: 'Listen to our latest sermon messages and teachings from Sunday services.',
            icon: '🎙️'
        },
        {
            label: 'Sermon Series',
            href: '/sermons#series',
            description: 'Explore our ongoing and past sermon series covering various biblical topics.',
            icon: '📚'
        },
        {
            label: 'Watch Live',
            href: '/sermons#live',
            description: 'Join us live for Sunday worship services and special events.',
            icon: '📺'
        },
        {
            label: 'By Topic',
            href: '/sermons#topics',
            description: 'Browse sermons organized by biblical topics and themes.',
            icon: '🔍'
        }
    ];

    // Visit Us sections
    const visitUsItems = [
        {
            label: 'Service Times',
            href: '/visit-us#service-times',
            description: 'Find our Sunday worship times and weekly service schedule.',
            icon: '⏰'
        },
        {
            label: 'Location & Directions',
            href: '/visit-us#location',
            description: 'Get directions to our church and information about parking.',
            icon: '📍'
        },
        {
            label: 'What to Expect',
            href: '/visit-us#what-to-expect',
            description: 'Learn what to expect when visiting us for the first time.',
            icon: '👋'
        },
        {
            label: 'Plan Your Visit',
            href: '/visit-us#plan',
            description: 'Prepare for your first visit with helpful information and tips.',
            icon: '📝'
        }
    ];

    // Giving sections
    const givingItems = [
        {
            label: 'Why We Give',
            href: '/giving#why',
            description: 'Understand the biblical foundation and importance of giving.',
            icon: '💝'
        },
        {
            label: 'Ways to Give',
            href: '/giving#ways',
            description: 'Discover the various methods available for giving to the church.',
            icon: '💳'
        },
        {
            label: 'Online Giving',
            href: '/giving#online',
            description: 'Make a secure online donation quickly and conveniently.',
            icon: '💻'
        },
        {
            label: 'Recurring Donations',
            href: '/giving#recurring',
            description: 'Set up automatic recurring donations to support our ministry.',
            icon: '🔄'
        }
    ];

    // Helper function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Handle menu expansion with click (for both mobile and desktop)
    const handleMenuClick = (menuName) => {
        setExpandedMenu(expandedMenu === menuName ? null : menuName);
    };

    // Handle smooth scroll to section
    const handleSectionClick = (href, e) => {
        const [path, hash] = href.split('#');

        if (location.pathname === path && hash) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        setExpandedMenu(null);
        setMobileMenuOpen(false);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setExpandedMenu(null);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, [mobileMenuOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setExpandedMenu(null);
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={`header-container ${expandedMenu ? 'expanded' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`} ref={navRef}>
            <nav className="main-nav">
                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <ul className={`nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <li className="header-item church-logo">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                            <img src="/zcbc-icon.png" alt="Zion Chin Baptist Church Logo" />
                        </Link>
                    </li>
                    <li className="header-item church-name">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>ZION CHIN BAPTIST CHURCH</Link>
                    </li>    
                    <li className="header-item">
                        <Link
                            to="/"
                            className={isActive('/') ? 'active' : ''}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setExpandedMenu(null);
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    
                    {/* About Us Expandable */}
                    <li
                        className={`header-item expandable ${expandedMenu === 'about' ? 'active' : ''}`}
                    >
                        <Link
                            to="/about-us"
                            className={`expandable-trigger mobile-link ${isActive('/about-us') ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <div
                            className={`expandable-trigger desktop-trigger ${isActive('/about-us') ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuClick('about');
                            }}
                        >
                            About Us
                            <span className={`expand-arrow ${expandedMenu === 'about' ? 'rotated' : ''}`}>
                                ▼
                            </span>
                        </div>
                    </li>

                    {/* Sermons Expandable */}
                    <li
                        className={`header-item expandable ${expandedMenu === 'sermons' ? 'active' : ''}`}
                    >
                        <Link
                            to="/sermons"
                            className={`expandable-trigger mobile-link ${isActive('/sermons') ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sermons
                        </Link>
                        <div
                            className={`expandable-trigger desktop-trigger ${isActive('/sermons') ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuClick('sermons');
                            }}
                        >
                            Sermons
                            <span className={`expand-arrow ${expandedMenu === 'sermons' ? 'rotated' : ''}`}>
                                ▼
                            </span>
                        </div>
                    </li>

                    {/* Visit Us Expandable */}
                    <li
                        className={`header-item expandable ${expandedMenu === 'visit' ? 'active' : ''}`}
                    >
                        <Link
                            to="/visit-us"
                            className={`expandable-trigger mobile-link ${isActive('/visit-us') ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Visit Us
                        </Link>
                        <div
                            className={`expandable-trigger desktop-trigger ${isActive('/visit-us') ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuClick('visit');
                            }}
                        >
                            Visit Us
                            <span className={`expand-arrow ${expandedMenu === 'visit' ? 'rotated' : ''}`}>
                                ▼
                            </span>
                        </div>
                    </li>

                    <li className="header-item">
                        <Link
                            to="/contact-us"
                            className={isActive('/contact-us') ? 'active' : ''}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setExpandedMenu(null);
                            }}
                        >
                            Contact Us
                        </Link>
                    </li>

                    {/* Giving Expandable */}
                    <li
                        className={`header-item expandable ${expandedMenu === 'giving' ? 'active' : ''}`}
                    >
                        <Link
                            to="/giving"
                            className={`expandable-trigger mobile-link ${isActive('/giving') ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Giving
                        </Link>
                        <div
                            className={`expandable-trigger desktop-trigger ${isActive('/giving') ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuClick('giving');
                            }}
                        >
                            Giving
                            <span className={`expand-arrow ${expandedMenu === 'giving' ? 'rotated' : ''}`}>
                                ▼
                            </span>
                        </div>
                    </li>
                </ul>
            </nav>

            {/* Expanded Menu Content - About Us */}
            <div className={`expanded-menu ${expandedMenu === 'about' ? 'show' : ''}`}>
                <div className="expanded-content">
                    <div className="expanded-header">
                        <div className="header-content">
                            <h2>Learn About Our Church</h2>
                            <p>Discover our mission, meet our leadership, and explore what makes our community special</p>
                        </div>
                        <div className="header-image">
                            <div className="church-icon">✝️</div>
                        </div>
                    </div>

                    <div className="expanded-sections">
                        <div className="sections-grid">
                            {aboutUsItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="section-card"
                                    onClick={(e) => handleSectionClick(item.href, e)}
                                >
                                    <div className="card-icon">
                                        <span className="icon">{item.icon}</span>
                                    </div>
                                    <div className="card-content">
                                        <h3>{item.label}</h3>
                                        <p>{item.description}</p>
                                        <span className="card-arrow">Learn More →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="expanded-footer">
                        <div className="footer-content">
                            <Link
                                to="/about-us"
                                className="main-page-link"
                                onClick={() => {
                                    setExpandedMenu(null);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <span>Visit Complete About Us Page</span>
                                <span className="footer-arrow">→</span>
                            </Link>
                            <div className="footer-text">
                                <p>Join us in worship and fellowship as we grow together in faith</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Menu Content - Sermons */}
            <div className={`expanded-menu ${expandedMenu === 'sermons' ? 'show' : ''}`}>
                <div className="expanded-content">
                    <div className="expanded-header">
                        <div className="header-content">
                            <h2>Explore Our Sermons</h2>
                            <p>Watch, listen, and grow in faith through our messages and teachings</p>
                        </div>
                        <div className="header-image">
                            <div className="church-icon">🎙️</div>
                        </div>
                    </div>

                    <div className="expanded-sections">
                        <div className="sections-grid">
                            {sermonsItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="section-card"
                                    onClick={(e) => handleSectionClick(item.href, e)}
                                >
                                    <div className="card-icon">
                                        <span className="icon">{item.icon}</span>
                                    </div>
                                    <div className="card-content">
                                        <h3>{item.label}</h3>
                                        <p>{item.description}</p>
                                        <span className="card-arrow">Explore →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="expanded-footer">
                        <div className="footer-content">
                            <Link
                                to="/sermons"
                                className="main-page-link"
                                onClick={() => {
                                    setExpandedMenu(null);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <span>View All Sermons</span>
                                <span className="footer-arrow">→</span>
                            </Link>
                            <div className="footer-text">
                                <p>Grow spiritually through God's word and biblical teaching</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Menu Content - Visit Us */}
            <div className={`expanded-menu ${expandedMenu === 'visit' ? 'show' : ''}`}>
                <div className="expanded-content">
                    <div className="expanded-header">
                        <div className="header-content">
                            <h2>Plan Your Visit</h2>
                            <p>We'd love to welcome you! Find everything you need to know about visiting our church</p>
                        </div>
                        <div className="header-image">
                            <div className="church-icon">👋</div>
                        </div>
                    </div>

                    <div className="expanded-sections">
                        <div className="sections-grid">
                            {visitUsItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="section-card"
                                    onClick={(e) => handleSectionClick(item.href, e)}
                                >
                                    <div className="card-icon">
                                        <span className="icon">{item.icon}</span>
                                    </div>
                                    <div className="card-content">
                                        <h3>{item.label}</h3>
                                        <p>{item.description}</p>
                                        <span className="card-arrow">Learn More →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="expanded-footer">
                        <div className="footer-content">
                            <Link
                                to="/visit-us"
                                className="main-page-link"
                                onClick={() => {
                                    setExpandedMenu(null);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <span>Visit Us Page</span>
                                <span className="footer-arrow">→</span>
                            </Link>
                            <div className="footer-text">
                                <p>Come as you are - everyone is welcome at Zion Chin Baptist Church</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Menu Content - Giving */}
            <div className={`expanded-menu ${expandedMenu === 'giving' ? 'show' : ''}`}>
                <div className="expanded-content">
                    <div className="expanded-header">
                        <div className="header-content">
                            <h2>Generosity & Giving</h2>
                            <p>Support our mission and ministry through your generous contributions</p>
                        </div>
                        <div className="header-image">
                            <div className="church-icon">💝</div>
                        </div>
                    </div>

                    <div className="expanded-sections">
                        <div className="sections-grid">
                            {givingItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="section-card"
                                    onClick={(e) => handleSectionClick(item.href, e)}
                                >
                                    <div className="card-icon">
                                        <span className="icon">{item.icon}</span>
                                    </div>
                                    <div className="card-content">
                                        <h3>{item.label}</h3>
                                        <p>{item.description}</p>
                                        <span className="card-arrow">Learn More →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="expanded-footer">
                        <div className="footer-content">
                            <Link
                                to="/giving"
                                className="main-page-link"
                                onClick={() => {
                                    setExpandedMenu(null);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <span>Give Now</span>
                                <span className="footer-arrow">→</span>
                            </Link>
                            <div className="footer-text">
                                <p>Each one must give as he has decided in his heart - 2 Corinthians 9:7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;