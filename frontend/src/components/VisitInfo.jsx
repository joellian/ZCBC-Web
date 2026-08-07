import { Link } from 'react-router-dom';
import './VisitInfo.css';
import { church } from '../config/church';
import ChurchMap from './common/ChurchMap';

/** Decorative icons for the two service cards, in the order services appear. */
const SERVICE_ICONS = [
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
];

const VisitInfo = () => {
  return (
    <div className="visit-info">
      {/* Service Times Section */}
      <section className="service-times">
        <div className="section-content">
          <h2>SUNDAY GATHERING TIMES</h2>
          <div className="times-grid">
            {church.services.map((service, index) => (
              <div key={service.name} className="time-card">
                <div className="time-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="48"
                    height="48"
                    aria-hidden="true"
                  >
                    <path d={SERVICE_ICONS[index % SERVICE_ICONS.length]} />
                  </svg>
                </div>
                <h3>{service.name}</h3>
                <p className="time">{service.time}</p>
                <p className="time-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="what-to-expect">
        <div className="section-content">
          <h2>WHAT TO EXPECT</h2>
          <div className="expect-grid">
            <div className="expect-item">
              <div className="expect-number">1</div>
              <h4>Warm Welcome</h4>
              <p>
                Our greeters will welcome you at the door and help you find your way
                around.
              </p>
            </div>
            <div className="expect-item">
              <div className="expect-number">2</div>
              <h4>Come As You Are</h4>
              <p>
                There's no dress code. We want you to feel comfortable and be yourself.
              </p>
            </div>
            <div className="expect-item">
              <div className="expect-number">3</div>
              <h4>Worship & Message</h4>
              <p>Experience heartfelt worship and a relevant message from God's Word.</p>
            </div>
            <div className="expect-item">
              <div className="expect-number">4</div>
              <h4>Children Welcome</h4>
              <p>Kids are welcome in the service, and we have programs for children.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="section-content">
          <h2>FIND US</h2>
          <p className="location-subtitle">Located in Northern Kentucky</p>

          <div className="location-grid">
            <div className="address-info">
              <div className="address-card">
                <h3>Our Address</h3>
                <div className="address-details">
                  <p>
                    <strong>{church.name}</strong>
                  </p>
                  <p>{church.address.street}</p>
                  <p>{church.address.cityStateZip}</p>
                </div>
                <a
                  href={church.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                >
                  Get Directions
                </a>
              </div>

              <div className="contact-card">
                <h3>Contact Us</h3>
                <div className="contact-details">
                  <p>
                    <strong>Email:</strong> {church.contact.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {church.contact.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="map-container">
              <ChurchMap height={350} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="visit-cta">
        <div className="section-content">
          <h2>We Can't Wait to Meet You!</h2>
          <p>Have questions before your visit? Feel free to reach out to us.</p>
          <Link to="/contact-us" className="cta-btn">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VisitInfo;
