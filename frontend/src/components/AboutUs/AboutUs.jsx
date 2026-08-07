import { Link } from 'react-router-dom';
import './AboutUs.css';
import { church } from '../../config/church';
import { extractText } from '../../utils/text';
import { useAboutUs, useLeaders } from '../../hooks/queries';
import { defaultContent, placeholderLeaders } from './aboutUsDefaults';
import DepartmentGroup from './DepartmentGroup';
import LeaderCard from './LeaderCard';

const AboutUs = () => {
  // Two independent queries — they run in parallel rather than in sequence.
  const { data: aboutUsData, isPending: loadingAbout } = useAboutUs();
  const { data: leaders = [], isPending: loadingLeaders } = useLeaders();

  const groupedLeaders = leaders.reduce((groups, leader) => {
    (groups[leader.department] ??= []).push(leader);
    return groups;
  }, {});

  if (loadingAbout || loadingLeaders) return <div className="loading">Loading...</div>;

  return (
    <div className="about-us">
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
          <p className="section-subtitle">
            Meet the people who serve and lead our congregation
          </p>

          {aboutUsData?.leadership_intro && (
            <p className="section-text">{extractText(aboutUsData.leadership_intro)}</p>
          )}

          {Object.keys(groupedLeaders).length > 0 ? (
            Object.entries(groupedLeaders).map(([department, departmentLeaders]) => (
              <DepartmentGroup
                key={department}
                department={department}
                leaders={departmentLeaders}
              />
            ))
          ) : (
            <div className="leaders-placeholder">
              <div className="leaders-grid">
                {placeholderLeaders.map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} />
                ))}
              </div>
              <p className="placeholder-note">
                Contact us to learn more about our leadership team.
              </p>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
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
          <p>
            We would love to welcome you to {church.name}. Come worship with us this
            Sunday!
          </p>
          <div className="cta-buttons">
            <Link to="/visit-us" className="cta-btn primary">
              Plan Your Visit
            </Link>
            <Link to="/contact-us" className="cta-btn secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
