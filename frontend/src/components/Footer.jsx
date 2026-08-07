import { Link } from 'react-router-dom';
import './Footer.css';
import { church } from '../config/church';
import SocialLinks from './common/SocialLinks';

const QUICK_LINKS = [
  { to: '/about-us', label: 'About Us' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/visit-us', label: 'Visit Us' },
  { to: '/giving', label: 'Give' },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-main">
        <div className="footer-brand">
          <img
            src="/zcbc-icon.png"
            alt={`${church.shortName} logo`}
            className="footer-logo"
          />
          <h3>{church.name}</h3>
          <p className="footer-tagline">{church.tagline}</p>
        </div>

        <div className="footer-column">
          <h4>Service Times</h4>
          {church.services.map((service) => (
            <div key={service.name}>
              <p>{service.name}</p>
              <p className="highlight">{service.time}</p>
            </div>
          ))}
        </div>

        <div className="footer-column">
          <h4>Location</h4>
          <p>{church.address.street}</p>
          <p>{church.address.cityStateZip}</p>
          <a
            href={church.maps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Get Directions
          </a>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p>{church.contact.email}</p>
          <p>{church.contact.phone}</p>
          <Link to="/contact-us" className="footer-link">
            Send a Message
          </Link>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            {QUICK_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <SocialLinks className="footer-social" size={22} />
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {church.name}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
