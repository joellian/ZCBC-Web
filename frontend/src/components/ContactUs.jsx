import { useState } from 'react';
import './ContactUs.css';
import { church } from '../config/church';
import { useSubmitContact } from '../hooks/mutations';
import ChurchMap from './common/ChurchMap';
import SocialLinks from './common/SocialLinks';

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

const ContactUs = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);

  // isPending / isSuccess / isError replace the three pieces of state the
  // component used to track by hand.
  const submitContact = useSubmitContact();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContact.mutate(formData, {
      onSuccess: () => setFormData(EMPTY_FORM),
    });
  };

  return (
    <div className="contact-us-page">
      {/* Contact Content Section */}
      <div className="contact-content">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="info-subtitle">Reach out to us through any of these channels</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="28"
                    height="28"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Our Location</h4>
                  <p>{church.name}</p>
                  <p>{church.address.street}</p>
                  <p>{church.address.cityStateZip}</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="28"
                    height="28"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Email Us</h4>
                  <p>
                    <a href={`mailto:${church.contact.email}`}>{church.contact.email}</a>
                  </p>
                  <p className="info-note">{church.contact.responseTime}</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="28"
                    height="28"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Call Us</h4>
                  <p>
                    <a href={`tel:${church.contact.phoneHref}`}>{church.contact.phone}</a>
                  </p>
                  <p className="info-note">{church.contact.officeHours}</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="28"
                    height="28"
                  >
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Service Times</h4>
                  {church.services.map((service) => (
                    <p key={service.name}>
                      {service.name}: {service.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h4>Follow Us</h4>
              <SocialLinks
                className="social-links"
                linkClassName="social-link"
                size={24}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <div className="form-header">
              <h2>Send us a Message</h2>
              {submitContact.isSuccess && (
                <div className="status-message success" role="status">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {submitContact.isError && (
                <div className="status-message error" role="alert">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="5"
                  required
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitContact.isPending}
                >
                  {submitContact.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="contact-map">
        <ChurchMap height={350} />
      </div>
    </div>
  );
};

export default ContactUs;
