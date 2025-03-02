import React from 'react';

const VisitInfo = (props) => {
    return (
        <div className="VisitInfo">
            <div className="card-body">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m0!3m2!1sen!2sus!4v1424234234234!6m8!1m7!1sjRS0zluO7YLgAufcgksx6A!2m2!1d39.0034366!2d-84.6232678!3f128.15!4f0!5f0.7820865974627469"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <p>
                <a href="https://www.google.com/maps/uv?pb=!1s0x8841c7319441753d%3A0xdb4c41b0eadaeb73!3m1!7e115!4s%2Fmaps%2Fplace%2Fzion%2Bchin%2Bbaptist%2Bchurch%2F%4039.0034366%2C-84.6232678%2C3a%2C75y%2C128.15h%2C90t%2Fdata%3D*213m4*211e1*213m2*211sjRS0zluO7YLgAufcgksx6A*212e0*214m2*213m1*211s0x8841c7319441753d%3A0xdb4c41b0eadaeb73%3Fsa%3DX%26ved%3D2ahUKEwi57YOAieuLAxWr7skDHS3vBHEQpx96BAgcEAA!5szion%20chin%20baptist%20church%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2sjRS0zluO7YLgAufcgksx6A&cr=le_a7&hl=en&ved=1t%3A206134&ictx=111#">
                   <button className="map-button">View on Google Maps</button>
                </a>
                </p>
            </div>
        </div>
    )
}
export default VisitInfo;