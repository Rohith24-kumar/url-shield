import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaRobot, FaChartLine, FaDatabase, 
  FaUsers, FaLock, FaServer, FaGlobe, FaCheckCircle,
  FaRocket, FaHeart, FaGraduationCap
} from 'react-icons/fa';
import { GiCyberEye, GiRadarSweep } from 'react-icons/gi';

const AboutSection = () => {
  const features = [
    { icon: <FaServer />, title: 'DNS Validation', desc: 'Checks if domain exists and resolves properly' },
    { icon: <FaLock />, title: 'SSL Certificate', desc: 'Verifies HTTPS encryption validity' },
    { icon: <FaUsers />, title: 'WHOIS Lookup', desc: 'Analyzes domain registration details' },
    { icon: <FaGlobe />, title: 'URL Pattern', desc: 'Detects suspicious keywords and patterns' },
    { icon: <GiRadarSweep />, title: 'Redirect Tracking', desc: 'Follows and analyzes redirect chains' },
    { icon: <FaChartLine />, title: 'Risk Scoring', desc: '0-100 risk score with clear verdicts' },
  ];

  const team = [
    { name: 'Rohith Kumar', role: 'Backend Developer', desc: '5 check modules, API, MongoDB' },
    { name: 'Priyanka', role: 'Frontend Developer', desc: 'React UI, API integration' },
    { name: 'Pradeep Madival', role: 'Data & DevOps', desc: 'History, stats, security' },
    { name: 'Pallavi C S', role: 'Documentation & Testing', desc: 'API testing, report, demo' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="about-header"
        >
          <div className="section-badge">
            <GiCyberEye /> About The Project
          </div>
          <h2>Protecting Users from <span>Phishing Attacks</span></h2>
          <p>
            SecureScan is a web-based application that analyzes URLs and determines 
            whether they are safe or potentially malicious using advanced 5-layer security analysis.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-card"
          >
            <div className="card-icon">
              <FaShieldAlt />
            </div>
            <h3>Why This Project?</h3>
            <p>
              Phishing attacks are increasing rapidly, and most users cannot identify 
              malicious URLs just by looking at them. Existing tools are either complex, 
              paid, or only detect known threats without explanation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="about-card"
          >
            <div className="card-icon">
              <FaRobot />
            </div>
            <h3>Our Solution</h3>
            <p>
              A simple, free, and user-friendly solution that performs multiple 
              security checks (DNS, SSL, WHOIS, URL pattern, redirect tracking) 
              in parallel using Promise.all() and generates a clear risk score.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="about-card"
          >
            <div className="card-icon">
              <FaDatabase />
            </div>
            <h3>Technology Stack</h3>
            <p>
              Built with MERN stack (MongoDB, Express, React, Node.js) with parallel 
              security checks, real-time detection, and scan history storage for analysis.
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="features-section"
          id="features"
        >
          <h3>5-Layer Security Analysis</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="stats-section"
        >
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Security Layers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free to Use</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Real-time</span>
              <span className="stat-label">Analysis</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Instant</span>
              <span className="stat-label">Results</span>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="team-section"
        >
          <h3>Our Team</h3>
          <p className="team-subtitle">Ramaiah Institute of Technology | Department of MCA</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="team-card"
              >
                <div className="team-avatar">
                  <FaUsers />
                </div>
                <h4>{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <p>{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problem Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="problem-section"
        >
          <h3>Why URL Security Matters</h3>
          <div className="problem-grid">
            <div className="problem-card">
              <FaHeart className="problem-icon" />
              <h4>Financial Loss</h4>
              <p>Phishing attacks can lead to significant financial loss and identity theft</p>
            </div>
            <div className="problem-card">
              <FaGraduationCap className="problem-icon" />
              <h4>Data Breaches</h4>
              <p>Malicious links can compromise sensitive personal and business data</p>
            </div>
            <div className="problem-card">
              <FaRocket className="problem-icon" />
              <h4>Rapid Growth</h4>
              <p>Phishing attacks are increasing rapidly, targeting non-technical users</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;