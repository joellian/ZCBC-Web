import React from 'react';
import { Link } from 'react-router-dom';
/* 
link rel="icon" type="image/svg+xml" href="/zcbc-icon.png"
*/
const NavBar = () => {
    return (
        <header className="header-container">
            <nav>
                <ul>
                    
                    <li className="header-item church-logo">
                        <Link to="/">
                            <img src="/zcbc-icon.png" alt = "Zion Chin Baptist Church Logo" />

                        </Link>
                    </li>
                    <li className="header-item church-name">
                        <Link to="/"> ZION CHIN BAPTIST CHURCH</Link>
                    </li>    
                    <li className="header-item"><a href="/">Home</a></li>
                    <li className="header-item"><a href="/about-us">About Us</a></li>
                    <li className="header-item"><a href="/sermons">Sermons</a></li>
                    <li className="header-item"><a href="/visit-us">Visit Us</a></li>
                    <li className="header-item"><a href="/contact-us">Contact Us</a></li>
                    <li className="header-item"><a href="/giving">Giving</a></li>

                </ul>
            </nav>
        </header>
    );
}

export default NavBar;