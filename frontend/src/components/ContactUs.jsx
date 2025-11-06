import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Here you would typically send the data to your backend
            // For now, we'll just simulate a submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form">
            <div className="form-header">
                <h4>Contact Us</h4>
                {submitStatus === 'success' && (
                    <p style={{ color: '#4CAF50', marginTop: '10px' }}>
                        Thank you! Your message has been sent successfully.
                    </p>
                )}
                {submitStatus === 'error' && (
                    <p style={{ color: '#f44336', marginTop: '10px' }}>
                        Sorry, there was an error sending your message. Please try again.
                    </p>
                )}
            </div>
            <div className="form-items">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name (required)</label>
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
                        <label htmlFor="email">Your Email (required)</label>
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
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject" 
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is your message about?" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message here..."
                            rows="4"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit" 
                            value={isSubmitting ? "Sending..." : "Submit"} 
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;