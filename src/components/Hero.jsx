import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-badge">
        <FaShieldAlt /> DNS Health & Phishing Detector
      </div>
      <h1>Check if a URL is<br /><span>safe or malicious</span></h1>
      <p>Real-time 5-layer security analysis • DNS • SSL • WHOIS • Pattern • Redirects</p>
    </div>
  );
};

export default Hero;