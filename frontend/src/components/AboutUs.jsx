import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import { aboutUsApi, leadersApi } from '../api';

const AboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState(null);
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

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
                if (aboutUsResponse.data && aboutUsResponse.data[0]) {
                    setAboutUsData(aboutUsResponse.data[0]);
                }

                // Fetch Leaders
                const leadersResponse = await leadersApi.getLeaders();
                if (leadersResponse.data) {
                    const sortedLeaders = leadersResponse.data.sort((a, b) => {
                        if (a.order && b.order) {
                            return a.order - b.order;
                        }
                        return a.name.localeCompare(b.name);
                    });
                    setLeaders(sortedLeaders);
                }

            } catch (err) {
                console.error('Error fetching data:', err);
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

    // Default content (used when CMS data is not available)
    const defaultContent = {
        whoWeAre: {
            title: "Who We Are",
            subtitle: "A Christ-Centered Community",
            content: "Zion Chin Baptist Church is a vibrant, faith-filled community of believers united by our love for Jesus Christ and our commitment to serving one another. We are a diverse congregation of families, individuals, and children who have come together to worship, grow, and share the Gospel.",
            values: [
                {
                    title: "Faith",
                    description: "We believe in the authority of Scripture and the transforming power of faith in Jesus Christ."
                },
                {
                    title: "Community",
                    description: "We are committed to building authentic relationships and supporting one another in love."
                },
                {
                    title: "Service",
                    description: "We serve our neighbors and our world with compassion, reflecting the heart of Christ."
                },
                {
                    title: "Growth",
                    description: "We pursue spiritual maturity through prayer, Bible study, and discipleship."
                }
            ]
        },
        ourStory: {
            title: "Our Story",
            subtitle: "A Journey of Faith",
            content: "Zion Chin Baptist Church was founded by a small group of Chin immigrants who came to the United States seeking religious freedom and a better life for their families. What began as a small prayer group meeting in homes has grown into a thriving congregation.",
            timeline: [
                {
                    year: "2010",
                    event: "First gathering of Chin families for worship in Florence, Kentucky"
                },
                {
                    year: "2012",
                    event: "Officially established as Zion Chin Baptist Church"
                },
                {
                    year: "2015",
                    event: "Moved to our current location at 213 Main Street"
                },
                {
                    year: "2020",
                    event: "Launched online services to reach our extended community"
                },
                {
                    year: "Present",
                    event: "Continuing to grow and serve our community in Florence"
                }
            ]
        },
        whatWeDo: {
            title: "What We Do",
            subtitle: "Serving God and Community",
            ministries: [
                {
                    name: "Sunday Worship",
                    description: "Join us every Sunday for powerful worship, prayer, and biblical teaching that will strengthen your faith.",
                    icon: "🙏"
                },
                {
                    name: "Sunday School",
                    description: "Bible study classes for all ages, helping everyone grow deeper in their understanding of God's Word.",
                    icon: "📖"
                },
                {
                    name: "Youth Ministry",
                    description: "Engaging programs for teens to build friendships, explore faith, and develop as young leaders.",
                    icon: "👥"
                },
                {
                    name: "Children's Ministry",
                    description: "Age-appropriate activities and lessons that help children learn about Jesus in fun and meaningful ways.",
                    icon: "👶"
                },
                {
                    name: "Prayer Ministry",
                    description: "Weekly prayer meetings where we intercede for our church, community, and world.",
                    icon: "✝️"
                },
                {
                    name: "Community Outreach",
                    description: "Serving our neighbors through food drives, community events, and acts of kindness.",
                    icon: "❤️"
                }
            ]
        },
        beliefs: {
            title: "What We Believe",
            items: [
                "The Bible is the inspired, infallible Word of God",
                "There is one God, eternally existing in three persons: Father, Son, and Holy Spirit",
                "Jesus Christ is the Son of God, born of a virgin, lived a sinless life, died for our sins, and rose again",
                "Salvation is by grace through faith in Jesus Christ alone",
                "The Church is the body of Christ, called to worship, fellowship, and witness",
                "Jesus Christ will return to establish His kingdom and judge the living and the dead"
            ]
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="about-us">
            {/* Page Header */}
            <div className="about-header">
                <h1>ABOUT US</h1>
                <p>Learn about our church, our mission, and the people who make up our community</p>
            </div>

            {/* Who We Are Section */}
            <section id="who-we-are" className="who-we-are">
                <div className="section-content">
                    <h2>{defaultContent.whoWeAre.title}</h2>
                    <p className="section-subtitle">{defaultContent.whoWeAre.subtitle}</p>
                    <p className="section-text">
                        {aboutUsData?.mission_section
                            ? extractText(aboutUsData.mission_section)
                            : defaultContent.whoWeAre.content}
                    </p>

                    <div className="values-grid">
                        {defaultContent.whoWeAre.values.map((value, index) => (
                            <div key={index} className="value-card">
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section id="leadership" className="leadership">
                <div className="section-content">
                    <h2>Leadership</h2>
                    <p className="section-subtitle">Meet the people who serve and lead our congregation</p>

                    {aboutUsData?.leadership_intro && (
                        <p className="section-text">{extractText(aboutUsData.leadership_intro)}</p>
                    )}

                    {Object.keys(groupedLeaders).length > 0 ? (
                        Object.entries(groupedLeaders).map(([department, departmentLeaders]) => (
                            <div key={department} className="department-group">
                                <h3>{department}</h3>
                                <div className="leaders-grid">
                                    {departmentLeaders.map((leader) => (
                                        <div key={leader.id} className="leader-card">
                                            {leader.photo ? (
                                                <img
                                                    src={`${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}${leader.photo.url}`}
                                                    alt={leader.name}
                                                    className="leader-photo"
                                                />
                                            ) : (
                                                <div className="leader-photo-placeholder">
                                                    <span>{leader.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            <div className="leader-info">
                                                <h4>{leader.name}</h4>
                                                <p className="leader-title">{leader.title}</p>
                                                {leader.bio && (
                                                    <p className="leader-bio">{extractText(leader.bio)}</p>
                                                )}
                                                {leader.email && (
                                                    <a href={`mailto:${leader.email}`} className="leader-email">
                                                        {leader.email}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="leaders-placeholder">
                            <div className="leaders-grid">
                                <div className="leader-card">
                                    <div className="leader-photo-placeholder">
                                        <span>P</span>
                                    </div>
                                    <div className="leader-info">
                                        <h4>Pastor</h4>
                                        <p className="leader-title">Senior Pastor</p>
                                        <p className="leader-bio">Leading our congregation with wisdom and dedication to God's Word.</p>
                                    </div>
                                </div>
                                <div className="leader-card">
                                    <div className="leader-photo-placeholder">
                                        <span>D</span>
                                    </div>
                                    <div className="leader-info">
                                        <h4>Deacons</h4>
                                        <p className="leader-title">Church Deacons</p>
                                        <p className="leader-bio">Serving our church family with care and compassion.</p>
                                    </div>
                                </div>
                            </div>
                            <p className="placeholder-note">Contact us to learn more about our leadership team.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Our Story Section */}
            <section id="our-story" className="our-story">
                <div className="section-content">
                    <h2>{defaultContent.ourStory.title}</h2>
                    <p className="section-subtitle">{defaultContent.ourStory.subtitle}</p>
                    <p className="section-text">
                        {aboutUsData?.history_section
                            ? extractText(aboutUsData.history_section)
                            : defaultContent.ourStory.content}
                    </p>

                    <div className="timeline">
                        {defaultContent.ourStory.timeline.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-content">
                                    <p>{item.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Believe Section */}
            <section id="what-we-believe" className="what-we-believe">
                <div className="section-content">
                    <h2>{defaultContent.beliefs.title}</h2>
                    <p className="section-subtitle">The foundation of our faith</p>

                    <div className="beliefs-list">
                        {defaultContent.beliefs.items.map((belief, index) => (
                            <div key={index} className="belief-item">
                                <div className="belief-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                </div>
                                <p>{belief}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section id="what-we-do" className="what-we-do">
                <div className="section-content">
                    <h2>{defaultContent.whatWeDo.title}</h2>
                    <p className="section-subtitle">{defaultContent.whatWeDo.subtitle}</p>

                    {aboutUsData?.vision_section && (
                        <p className="section-text">{extractText(aboutUsData.vision_section)}</p>
                    )}

                    <div className="ministries-grid">
                        {defaultContent.whatWeDo.ministries.map((ministry, index) => (
                            <div key={index} className="ministry-card">
                                <div className="ministry-icon">{ministry.icon}</div>
                                <h4>{ministry.name}</h4>
                                <p>{ministry.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="section-content">
                    <h2>Join Our Church Family</h2>
                    <p>We would love to welcome you to Zion Chin Baptist Church. Come worship with us this Sunday!</p>
                    <div className="cta-buttons">
                        <a href="/visit-us" className="cta-btn primary">Plan Your Visit</a>
                        <a href="/contact-us" className="cta-btn secondary">Contact Us</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
