import React, { useState } from 'react';
import './Giving.css';

const Giving = () => {
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [givingType, setGivingType] = useState('tithe');

    const presetAmounts = ['25', '50', '100', '250', '500'];

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setSelectedAmount('custom');
    };

    const handleGiveNow = () => {
        const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
        // This would integrate with a payment processor like Stripe, PayPal, etc.
        alert(`Thank you for your generosity! Redirecting to payment for $${amount}...`);
    };

    return (
        <div className="giving-page">
            {/* Header Section */}
            <div className="giving-header">
                <h1>GIVE</h1>
                <p>Your generosity helps us spread the love of Christ and serve our community. Thank you for your faithful giving.</p>
            </div>

            {/* Scripture Section */}
            <section className="scripture-section">
                <div className="section-content">
                    <blockquote>
                        <p>"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</p>
                        <cite>- 2 Corinthians 9:7</cite>
                    </blockquote>
                </div>
            </section>

            {/* Online Giving Section */}
            <section className="online-giving">
                <div className="section-content">
                    <h2>GIVE ONLINE</h2>
                    <p className="section-subtitle">Safe, secure, and convenient online giving</p>

                    <div className="giving-form-container">
                        {/* Giving Type Selection */}
                        <div className="giving-type">
                            <label>Select Giving Type</label>
                            <div className="type-buttons">
                                <button
                                    className={`type-btn ${givingType === 'tithe' ? 'active' : ''}`}
                                    onClick={() => setGivingType('tithe')}
                                >
                                    Tithe
                                </button>
                                <button
                                    className={`type-btn ${givingType === 'offering' ? 'active' : ''}`}
                                    onClick={() => setGivingType('offering')}
                                >
                                    Offering
                                </button>
                                <button
                                    className={`type-btn ${givingType === 'missions' ? 'active' : ''}`}
                                    onClick={() => setGivingType('missions')}
                                >
                                    Missions
                                </button>
                                <button
                                    className={`type-btn ${givingType === 'building' ? 'active' : ''}`}
                                    onClick={() => setGivingType('building')}
                                >
                                    Building Fund
                                </button>
                            </div>
                        </div>

                        {/* Amount Selection */}
                        <div className="amount-selection">
                            <label>Select Amount</label>
                            <div className="preset-amounts">
                                {presetAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                                        onClick={() => handleAmountSelect(amount)}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                            <div className="custom-amount">
                                <label htmlFor="custom-amount">Or enter custom amount</label>
                                <div className="custom-input-wrapper">
                                    <span className="currency-symbol">$</span>
                                    <input
                                        type="number"
                                        id="custom-amount"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                        placeholder="0.00"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Give Button */}
                        <button
                            className="give-btn"
                            onClick={handleGiveNow}
                            disabled={!selectedAmount && !customAmount}
                        >
                            Give Now
                        </button>

                        <p className="secure-notice">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            Your payment is secure and encrypted
                        </p>
                    </div>
                </div>
            </section>

            {/* Other Ways to Give */}
            <section className="other-ways">
                <div className="section-content">
                    <h2>OTHER WAYS TO GIVE</h2>
                    <div className="ways-grid">
                        <div className="way-card">
                            <div className="way-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                                </svg>
                            </div>
                            <h3>In Person</h3>
                            <p>Give during our Sunday services. Offering envelopes are available in the sanctuary.</p>
                        </div>

                        <div className="way-card">
                            <div className="way-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                                </svg>
                            </div>
                            <h3>By Mail</h3>
                            <p>Send your gift to:<br/>
                            Zion Chin Baptist Church<br/>
                            213 Main Street<br/>
                            Florence, KY 41042</p>
                        </div>

                        <div className="way-card">
                            <div className="way-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                                    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                                </svg>
                            </div>
                            <h3>Bank Transfer</h3>
                            <p>Contact our office for bank transfer details and set up recurring donations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Give Section */}
            <section className="why-give">
                <div className="section-content">
                    <h2>WHY WE GIVE</h2>
                    <div className="why-grid">
                        <div className="why-item">
                            <h4>Worship</h4>
                            <p>Giving is an act of worship, acknowledging that everything we have comes from God.</p>
                        </div>
                        <div className="why-item">
                            <h4>Obedience</h4>
                            <p>We give in obedience to God's Word, which teaches us to honor Him with our firstfruits.</p>
                        </div>
                        <div className="why-item">
                            <h4>Kingdom Impact</h4>
                            <p>Your generosity enables us to spread the Gospel, serve our community, and support missions worldwide.</p>
                        </div>
                        <div className="why-item">
                            <h4>Blessing</h4>
                            <p>God promises to bless those who give faithfully and cheerfully.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How We Use Your Gifts */}
            <section className="how-we-use">
                <div className="section-content">
                    <h2>HOW YOUR GIFTS ARE USED</h2>
                    <div className="use-grid">
                        <div className="use-item">
                            <div className="use-percentage">40%</div>
                            <h4>Ministry & Outreach</h4>
                            <p>Supporting local and global missions, community programs, and church ministries.</p>
                        </div>
                        <div className="use-item">
                            <div className="use-percentage">30%</div>
                            <h4>Staff & Operations</h4>
                            <p>Supporting our pastoral team and maintaining daily church operations.</p>
                        </div>
                        <div className="use-item">
                            <div className="use-percentage">20%</div>
                            <h4>Facilities</h4>
                            <p>Maintaining and improving our church building and facilities.</p>
                        </div>
                        <div className="use-item">
                            <div className="use-percentage">10%</div>
                            <h4>Benevolence</h4>
                            <p>Helping those in need within our church family and community.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Questions Section */}
            <section className="giving-questions">
                <div className="section-content">
                    <h2>Questions About Giving?</h2>
                    <p>If you have any questions about giving or need assistance, please don't hesitate to reach out to us.</p>
                    <a href="/contact-us" className="contact-btn">Contact Us</a>
                </div>
            </section>
        </div>
    );
};

export default Giving;
