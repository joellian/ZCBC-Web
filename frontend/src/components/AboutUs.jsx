import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import { aboutUsApi, leadersApi } from '../api';

const AboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState(null);
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to convert rich text to plain text
    const extractText = (richTextArray) => {
        if (!richTextArray || !Array.isArray(richTextArray)) return '';
        return richTextArray.map(block => 
            block.children?.map(child => child.text).join('') || ''
        ).join(' ');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch About Us content
                const aboutUsResponse = await aboutUsApi.getAboutUs();
                setAboutUsData(aboutUsResponse.data[0]);
                
                // Fetch Leaders
                const leadersResponse = await leadersApi.getLeaders();
                // Sort leaders by order field, then by name
                const sortedLeaders = leadersResponse.data.sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order - b.order;
                    }
                    return a.name.localeCompare(b.name);
                });
                setLeaders(sortedLeaders);
                
            } catch (err) {
                setError('Failed to load content');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Smooth scroll effect when component mounts with hash
    useEffect(() => {
        if (!loading && window.location.hash) {
            const elementId = window.location.hash.substring(1);
            const element = document.getElementById(elementId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
        }
    }, [loading]);

    // Group leaders by department
    const groupedLeaders = leaders.reduce((groups, leader) => {
        const department = leader.department;
        if (!groups[department]) {
            groups[department] = [];
        }
        groups[department].push(leader);
        return groups;
    }, {});

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!aboutUsData) return <div>No content found</div>;

    return (
        <div className="about-us">
            <section id="leadership" className="leadership">
                <h2>Leadership</h2>
                {aboutUsData.leadership_intro && (
                    <p>{extractText(aboutUsData.leadership_intro)}</p>
                )}
                
                {/* Display leaders by department */}
                {Object.entries(groupedLeaders).map(([department, departmentLeaders]) => (
                    <div key={department} className="department-group">
                        <h3>{department}</h3>
                        <div className="leaders-grid">
                            {departmentLeaders.map((leader) => (
                                <div key={leader.id} className="leader-card">
                                    {leader.photo && (
                                        <img
                                            src={`${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}${leader.photo.url}`}
                                            alt={leader.name}
                                            className="leader-photo"
                                        />
                                    )}
                                    <div className="leader-info">
                                        <h4>{leader.name}</h4>
                                        <p className="leader-title">{leader.title}</p>
                                        {leader.bio && (
                                            <p>{extractText(leader.bio)}</p>
                                        )}
                                        {leader.email && (
                                            <a href={`mailto:${leader.email}`}>
                                                {leader.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section id="who-we-are" className="who-we-are">
                <h2>Who We Are</h2>
                <p>{extractText(aboutUsData.mission_section)}</p>
            </section>

            <section id="our-story" className="our-story">
                <h2>Our Story</h2>
                <p>{extractText(aboutUsData.history_section)}</p>
            </section>

            <section id="what-we-do" className="what-we-do">
                <h2>What We Do</h2>
                <p>{extractText(aboutUsData.vision_section)}</p>
            </section>
        </div>
    );
}

export default AboutUs;