import { Link } from 'react-router-dom';
import './HomePage.css';
import { church } from '../config/church';
import { extractText, formatDate, truncate } from '../utils/text';
import { mediaUrl } from '../utils/media';
import { useLatestSermon } from '../hooks/queries';
import ChurchMap from './common/ChurchMap';

/** Shown when there is no sermon in the CMS yet. */
const FALLBACK_SERMON = {
  title: 'Sunday Message',
  speaker: 'Pastor',
  dateLabel: 'Join us this Sunday',
  description:
    'Experience powerful worship and biblical teaching that will strengthen your faith and encourage your walk with Christ.',
  thumbnail: null,
};

// TODO: promote to a Strapi `event` content type so the office can edit these.
const upcomingEvents = [
  ...church.services.map((service) => ({
    id: service.name,
    title: service.name,
    date: 'Every Sunday',
    time: service.time,
    description: service.description,
  })),
  {
    id: 'prayer-meeting',
    title: 'Prayer Meeting',
    date: 'Every Wednesday',
    time: '7:00 PM',
    description: 'Come together in prayer for our church and community',
  },
];

const HomePage = () => {
  const { data: latestSermon, isPending } = useLatestSermon();

  // Normalise the API shape and the fallback into one object so the card
  // below is written once instead of twice.
  const featured = latestSermon
    ? {
        title: latestSermon.title,
        speaker: latestSermon.speaker || 'Pastor',
        dateLabel: formatDate(latestSermon.date || latestSermon.createdAt),
        description: truncate(extractText(latestSermon.description)),
        thumbnail: mediaUrl(latestSermon.thumbnail),
      }
    : FALLBACK_SERMON;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">JESUS CHRIST TRANSFORMS LIVES</h1>
          <p className="hero-tagline">{church.tagline}</p>
          <div className="hero-buttons">
            <Link to="/visit-us" className="hero-btn primary">
              Plan Your Visit
            </Link>
            <Link to="/sermons" className="hero-btn secondary">
              Watch Live
            </Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="section-content">
          <h2>Welcome to Our Church</h2>
          <p className="section-subtitle">A Christ-Centered Community</p>
          <p className="welcome-text">
            Zion Chin Baptist Church is a vibrant, faith-filled community of believers
            united by our love for Jesus Christ and our commitment to serving one another.
            We are a diverse congregation of families, individuals, and children who have
            come together to worship, grow, and share the Gospel.
          </p>
          <Link to="/about-us" className="section-btn">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Service Times & Location Section */}
      <section className="service-location-section">
        <div className="section-content">
          <h2>Join Us This Sunday</h2>
          <p className="section-subtitle">We'd love to see you</p>

          <div className="service-location-grid">
            <div className="service-times-card">
              <div className="card-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="48"
                  height="48"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <h3>Service Times</h3>
              {church.services.map((service) => (
                <div key={service.name} className="service-time-item">
                  <strong>{service.name}</strong>
                  <span>{service.time}</span>
                </div>
              ))}
            </div>

            <div className="location-card">
              <div className="card-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="48"
                  height="48"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3>Location</h3>
              <p className="address">
                {church.address.street}
                <br />
                {church.address.cityStateZip}
              </p>
              <a
                href={church.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-link"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="map-preview">
            <ChurchMap height={300} rounded />
          </div>

          <Link to="/visit-us" className="section-btn">
            Plan Your Visit
          </Link>
        </div>
      </section>

      {/* Latest Sermon Section */}
      <section className="latest-sermon-section">
        <div className="section-content">
          <h2>Latest Message</h2>
          <p className="section-subtitle">Catch up on our most recent sermon</p>

          {isPending ? (
            <div className="sermon-loading">Loading...</div>
          ) : (
            <div className="sermon-card">
              <div className="sermon-thumbnail">
                {featured.thumbnail ? (
                  <img src={featured.thumbnail} alt={featured.title} />
                ) : (
                  <div className="sermon-thumbnail-placeholder">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="64"
                      height="64"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="sermon-info">
                <h3>{featured.title}</h3>
                <p className="sermon-speaker">{featured.speaker}</p>
                <p className="sermon-date">{featured.dateLabel}</p>
                {featured.description && (
                  <p className="sermon-description">{featured.description}</p>
                )}
              </div>
            </div>
          )}

          <div className="sermon-buttons">
            <Link to="/sermons" className="section-btn">
              Watch Now
            </Link>
            <Link to="/sermons" className="section-btn secondary">
              Browse All Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="section-content">
          <h2>Upcoming Events</h2>
          <p className="section-subtitle">What's happening at ZCBC</p>

          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date-badge">
                  <span className="event-day">{event.date}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-time">{event.time}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Connected Section */}
      <section className="connect-section">
        <div className="section-content">
          <h2>Get Connected</h2>
          <p className="section-subtitle">Take your next step</p>
          <p className="connect-text">
            Whether you're looking to join a community group, serve others, or simply
            learn more about our church, we have a place for you. Take the next step in
            your faith journey with us.
          </p>

          <div className="connect-grid">
            <div className="connect-card">
              <div className="connect-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="40"
                  height="40"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h3>Join a Group</h3>
              <p>
                Connect with others in a small group setting for fellowship and growth.
              </p>
            </div>

            <div className="connect-card">
              <div className="connect-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="40"
                  height="40"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3>Serve</h3>
              <p>Use your gifts and talents to serve our church and community.</p>
            </div>

            <div className="connect-card">
              <div className="connect-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="40"
                  height="40"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h3>Worship</h3>
              <p>Join our worship team and help lead our congregation in praise.</p>
            </div>
          </div>

          <Link to="/contact-us" className="section-btn">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Give Section */}
      <section className="give-section">
        <div className="section-content">
          <div className="give-content">
            <h2>Support Our Mission</h2>
            <p className="give-text">
              Your generosity helps us spread the love of Christ, serve our community, and
              support missions around the world. Every gift makes a difference.
            </p>
            <Link to="/giving" className="section-btn give-btn">
              Give Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
