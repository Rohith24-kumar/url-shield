import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiHeart, FiUsers, FiServer, FiDatabase, FiCode, FiTrendingUp, FiLock, FiGlobe } from 'react-icons/fi';

const AboutPage = () => {
  const team = [
    { name: 'Priyanka', role: 'Frontend Developer', desc: 'React UI development, API integration, responsive design' },
    { name: 'Rohith Kumar', role: 'Backend Developer', desc: '5 check modules, API development, MongoDB integration' },
    { name: 'Pradeep Madival', role: 'Data & DevOps', desc: 'History management, statistics, security middleware' },
    { name: 'Pallavi C S', role: 'Documentation & Testing', desc: 'API testing, edge cases, report preparation' },
  ];

  const techStack = [
    { icon: <FiServer />, name: 'MongoDB', desc: 'NoSQL database for storing scan history' },
    { icon: <FiCode />, name: 'Express.js', desc: 'Backend framework for REST APIs' },
    { icon: <FiCpu />, name: 'React', desc: 'Frontend library for dynamic UI' },
    { icon: <FiDatabase />, name: 'Node.js', desc: 'JavaScript runtime for backend' },
  ];

  return (
    <div className="about-page-pro">
      {/* Hero Section */}
      <div className="page-hero-pro">
        <div className="container-pro">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero-content"
          >
            <div className="hero-badge-pro">
              <FiShield /> About SecureScan
            </div>
            <h1>Protecting Users from <span className="gradient-text">Phishing Attacks</span></h1>
            <p>SecureScan is a comprehensive web application that analyzes URLs in real-time to detect phishing attempts</p>
          </motion.div>
        </div>
      </div>

      <div className="container-pro">
        {/* Mission Cards */}
        <div className="mission-grid-pro">
          <div className="mission-card-pro">
            <div className="mission-icon-pro"><FiShield /></div>
            <h3>Our Mission</h3>
            <p>To provide simple, free, and effective URL security analysis for everyone</p>
          </div>
          <div className="mission-card-pro">
            <div className="mission-icon-pro"><FiCpu /></div>
            <h3>Our Solution</h3>
            <p>5-layer parallel security checks with instant risk scoring</p>
          </div>
          <div className="mission-card-pro">
            <div className="mission-icon-pro"><FiHeart /></div>
            <h3>Our Promise</h3>
            <p>Fast, reliable, and accessible security for all users</p>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="features-highlight-pro">
          <h2>Key <span className="gradient-text">Features</span></h2>
          <div className="features-highlight-grid">
            <div className="highlight-item"><FiLock /> SSL Certificate</div>
            <div className="highlight-item"><FiGlobe /> DNS Validation</div>
            <div className="highlight-item"><FiUsers /> WHOIS Lookup</div>
            <div className="highlight-item"><FiTrendingUp /> Risk Scoring</div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section-pro">
          <h2>Meet Our <span className="gradient-text">Team</span></h2>
          <p className="team-subtitle-pro">Ramaiah Institute of Technology | Department of MCA</p>
          <div className="team-grid-pro">
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="team-card-pro"
              >
                <div className="team-avatar-pro">
                  <FiUsers />
                </div>
                <h4>{member.name}</h4>
                <span className="team-role-pro">{member.role}</span>
                <p>{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack-pro">
          <h2>Built With <span className="gradient-text">Modern Tech</span></h2>
          <div className="tech-stack-grid-pro">
            {techStack.map((tech, idx) => (
              <div key={idx} className="tech-item-pro">
                <div className="tech-icon-pro">{tech.icon}</div>
                <div>
                  <h4>{tech.name}</h4>
                  <p>{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
