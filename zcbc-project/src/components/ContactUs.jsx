import React from 'react'

const ContactUs = () => {
    return (
        <div className="contact-form">
            <div className="form-header">
                <h4>Contact Us</h4>
            </div>
            <div className="forms-items">
            <form>
                <div className="form-group">
                    <label htmlFor="name">Your Name (required)</label>
                    <input type="text" id="name" name="name" placeholder="Na Min" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your Email (required)</label>
                    <input type="email" id="email" name="email" placeholder="Na Email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="Chimceih Duh Mi Kong" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" placeholder="Na Cakuat"row="4"></textarea>
                </div>
                <div className="form-group">
                        <input type="submit" value="Submit" />
                </div>
            </form>
            </div>
        </div>
    );
}

export default ContactUs;