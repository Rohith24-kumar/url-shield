import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiServer, FiLock, FiUserCheck, FiFileText, FiRefreshCw, 
  FiZap, FiDatabase, FiTrendingUp, FiShield
} from 'react-icons/fi';

const FeaturesPage = () => {
  const features = [
    { icon: <FiServer />, title: 'DNS Validation', desc: 'Real-time DNS lookup to verify domain existence and detect suspicious patterns', color: '#6366f1', bg: '#eef2ff' },
    { icon: <FiLock />, title: 'SSL Certificate', desc: 'Comprehensive SSL/TLS certificate validation and encryption strength analysis', color: '#10b981', bg: '#d1fae5' },
    { icon: <FiUserCheck />, title: 'WHOIS Lookup', desc: 'Deep domain registration analysis including creation date and registrar info', color: '#f59e0b', bg: '#fed7aa' },
    { icon: <FiFileText />, title: 'URL Pattern', desc: 'Advanced pattern matching to detect phishing keywords and typosquatting', color: '#ef4444', bg: '#fecaca' },
    { icon: <FiRefreshCw />, title: 'Redirect Tracking', desc: 'Follows and analyzes redirect chains to detect malicious forwarding', color: '#8b5cf6', bg: '#ede9fe' },
    { icon: <FiZap />, title: 'Real-time Analysis', desc: 'All 5 checks run in parallel for instant results under 2 seconds', color: '#06b6d4', bg: '#cffafe' },
    { icon: <FiDatabase />, title: 'Scan History', desc: 'Persistent storage of all scans with advanced filtering and search', color: '#ec4899', bg: '#fce7f3' },
    { icon: <FiTrendingUp />, title: 'Risk Scoring', desc: 'Intelligent 0-100 risk scoring with clear safe/suspicious/danger verdicts', color: '#14b8a6', bg: '#ccfbf1' },
  ];

  return (
    <div className="features-page-pro">
      {/* Hero Section */}
      <div className="page-hero-pro">
        <div className="container-pro">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero-content"
          >
            <div className="hero-badge-pro">
              <FiShield /> Security Features
            </div>
            <h1>Powerful <span className="gradient-text">Security Features</span></h1>
            <p>Everything you need to stay protected from online threats</p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container-pro">
        <div className="features-grid-pro">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="feature-card-pro"
            >
              <div className="feature-icon-pro" style={{ background: feature.bg, color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-card-pro">
          <div className="stats-grid-pro">
            <div className="stat-item-pro">
              <span className="stat-number-pro">5</span>
              <span className="stat-label-pro">Security Layers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-pro">
              <span className="stat-number-pro">&lt;2s</span>
              <span className="stat-label-pro">Response Time</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-pro">
              <span className="stat-number-pro">100%</span>
              <span className="stat-label-pro">Free Forever</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-pro">
              <span className="stat-number-pro">24/7</span>
              <span className="stat-label-pro">Availability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
