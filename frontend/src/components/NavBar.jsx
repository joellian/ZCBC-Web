import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const location = useLocation();
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
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

    // Helper function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Handle menu expansion
    const handleMouseEnter = (menuName) => {
        if (!isMobile) {
            setExpandedMenu(menuName);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setExpandedMenu(null);
        }
    };

    // Handle mobile menu click
    const handleMenuClick = (menuName) => {
        if (isMobile) {
            setExpandedMenu(expandedMenu === menuName ? null : menuName);
        }
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
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setExpandedMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={`header-container ${expandedMenu ? 'expanded' : ''}`} ref={navRef}>
            <nav className="main-nav">
                <ul className="nav-items">
                    <li className="header-item church-logo">
                        <Link to="/">
                            <img src="/zcbc-icon.png" alt="Zion Chin Baptist Church Logo" />
                        </Link>
                    </li>
                    <li className="header-item church-name">
                        <Link to="/">ZION CHIN BAPTIST CHURCH</Link>
                    </li>    
                    <li className="header-item">
                        <Link 
                            to="/" 
                            className={isActive('/') ? 'active' : ''}
                        >
                            Home
                        </Link>
                    </li>
                    
                    {/* About Us Expandable */}
                    <li 
                        className={`header-item expandable ${expandedMenu === 'about' ? 'active' : ''}`}
                        onMouseEnter={() => handleMouseEnter('about')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link 
                            to="/about-us" 
                            className={`expandable-trigger ${isActive('/about-us') ? 'active' : ''}`}
                            onClick={(e) => {
                                if (isMobile) {
                                    e.preventDefault();
                                    handleMenuClick('about');
                                }
                            }}
                        >
                            About Us
                            <span className={`expand-arrow ${expandedMenu === 'about' ? 'rotated' : ''}`}>
                                ▼
                            </span>
                        </Link>
                    </li>

                    <li className="header-item">
                        <Link 
                            to="/sermons" 
                            className={isActive('/sermons') ? 'active' : ''}
                        >
                            Sermons
                        </Link>
                    </li>
                    <li className="header-item">
                        <Link 
                            to="/visit-us" 
                            className={isActive('/visit-us') ? 'active' : ''}
                        >
                            Visit Us
                        </Link>
                    </li>
                    <li className="header-item">
                        <Link 
                            to="/contact-us" 
                            className={isActive('/contact-us') ? 'active' : ''}
                        >
                            Contact Us
                        </Link>
                    </li>
                    <li className="header-item">
                        <Link 
                            to="/giving" 
                            className={isActive('/giving') ? 'active' : ''}
                        >
                            Giving
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Expanded Menu Content */}
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
                                onClick={() => setExpandedMenu(null)}
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

            {/* Overlay */}
            {expandedMenu && <div className="nav-overlay" onClick={() => setExpandedMenu(null)}></div>}
        </header>
    );
}

export default NavBar;