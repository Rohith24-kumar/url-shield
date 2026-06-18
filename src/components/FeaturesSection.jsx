import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaServer, FaLock, FaUserCheck, FaFileAlt, FaRandom, 
  FaChartLine, FaShieldAlt, FaBolt, FaDatabase, FaHistory
} from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    { 
      icon: <FaServer />, 
      title: 'DNS Validation', 
      desc: 'Checks domain resolution and DNS records',
      color: '#6366f1'
    },
    { 
      icon: <FaLock />, 
      title: 'SSL Certificate', 
      desc: 'Verifies HTTPS and certificate validity',
      color: '#10b981'
    },
    { 
      icon: <FaUserCheck />, 
      title: 'WHOIS Lookup', 
      desc: 'Analyzes domain registration details',
      color: '#f59e0b'
    },
    { 
      icon: <FaFileAlt />, 
      title: 'URL Pattern', 
      desc: 'Detects suspicious keywords and patterns',
      color: '#ef4444'
    },
    { 
      icon: <FaRandom />, 
      title: 'Redirect Tracking', 
      desc: 'Follows and analyzes redirect chains',
      color: '#8b5cf6'
    },
    { 
      icon: <FaChartLine />, 
      title: 'Risk Scoring', 
      desc: '0-100 risk score with clear verdict',
      color: '#06b6d4'
    },
    { 
      icon: <FaBolt />, 
      title: 'Parallel Checks', 
      desc: 'All 5 checks run simultaneously using Promise.all()',
      color: '#ec4899'
    },
    { 
      icon: <FaHistory />, 
      title: 'Scan History', 
      desc: 'Store and review all previous analyses',
      color: '#14b8a6'
    },
    { 
      icon: <FaDatabase />, 
      title: 'MongoDB Storage', 
      desc: 'Persistent storage for scan records',
      color: '#3b82f6'
    },
  ];

  return (
    <section id="features" className="features-page-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="features-header"
        >
          <div className="section-badge">
            <FaShieldAlt /> Powerful Features
          </div>
          <h2>Advanced Security <span>Analysis</span></h2>
          <p>
            Our 5-layer security system performs comprehensive URL analysis to protect 
            you from phishing attacks and malicious websites.
          </p>
        </motion.div>

        <div className="features-page-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="feature-page-card"
              style={{ '--feature-color': feature.color }}
            >
              <div className="feature-page-icon" style={{ background: `${feature.color}15`, color: feature.color }}>
                {feature.icon}
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="tech-stack"
        >
          <h3>Built with MERN Stack</h3>
          <div className="tech-icons">
            <span>MongoDB</span>
            <span>Express.js</span>
            <span>React</span>
            <span>Node.js</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;