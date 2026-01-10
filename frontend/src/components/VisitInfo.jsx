import React from 'react';
import './VisitInfo.css';

const VisitInfo = () => {
    return (
        <div className="visit-info">
            {/* Header Section */}
            <div className="visit-header">
                <h1>PLAN YOUR VISIT</h1>
                <p>We would love to have you join us for worship. Here's everything you need to know for your first visit.</p>
            </div>

            {/* Service Times Section */}
            <section className="service-times">
                <div className="section-content">
                    <h2>SUNDAY GATHERING TIMES</h2>
                    <div className="times-grid">
                        <div className="time-card">
                            <div className="time-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <h3>Sunday School</h3>
                            <p className="time">12:00 PM - 2:00 PM</p>
                            <p className="time-description">Bible study classes for all ages</p>
                        </div>
                        <div className="time-card">
                            <div className="time-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                </svg>
                            </div>
                            <h3>The Chapel Service</h3>
                            <p className="time">2:00 PM - 4:00 PM</p>
                            <p className="time-description">Worship, prayer, and message</p>
                        </div>
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
                            <p>Our greeters will welcome you at the door and help you find your way around.</p>
                        </div>
                        <div className="expect-item">
                            <div className="expect-number">2</div>
                            <h4>Come As You Are</h4>
                            <p>There's no dress code. We want you to feel comfortable and be yourself.</p>
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
                                    <p><strong>Zion Chin Baptist Church</strong></p>
                                    <p>213 Main Street</p>
                                    <p>Florence, KY 41042</p>
                                </div>
                                <a
                                    href="https://www.google.com/maps/place/Zion+Chin+Baptist+Church/@39.0034366,-84.6232678,17z"
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
                                    <p><strong>Email:</strong> info@zcbcflorence.org</p>
                                    <p><strong>Phone:</strong> (859) 555-0123</p>
                                </div>
                            </div>
                        </div>

                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.8234234234!2d-84.6254565!3d39.0034366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841c7319441753d%3A0xdb4c41b0eadaeb73!2sZion%20Chin%20Baptist%20Church!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Church Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="visit-cta">
                <div className="section-content">
                    <h2>We Can't Wait to Meet You!</h2>
                    <p>Have questions before your visit? Feel free to reach out to us.</p>
                    <a href="/contact-us" className="cta-btn">Contact Us</a>
                </div>
            </section>
        </div>
    );
};

export default VisitInfo;
