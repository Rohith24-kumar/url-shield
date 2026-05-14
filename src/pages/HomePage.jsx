// HomePage.jsx - Exactly like the picture
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiCheckCircle, FiAlertTriangle, FiArrowRight, FiGlobe } from 'react-icons/fi';
import { FaSkull } from 'react-icons/fa';
import { analyzeUrl } from '../services/api';
import { validateUrl } from '../utils/helpers';

const HomePage = ({ scanHistory, setScanHistory }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const saveToHistory = (scanResult) => {
    const newHistory = [scanResult, ...scanHistory].slice(0, 10);
    setScanHistory(newHistory);
    localStorage.setItem('scanHistory', JSON.stringify(newHistory));
  };

  const handleScan = async (e) => {
    e.preventDefault();
    let fullUrl = url.trim();
    if (!fullUrl) {
      setErrorMsg('Please enter a URL');
      return;
    }
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl;
    }
    if (!validateUrl(fullUrl)) {
      setErrorMsg('Please enter a valid URL (e.g., google.com)');
      return;
    }
    
    setErrorMsg('');
    setLoading(true);
    setResult(null);
    
    try {
      const analysis = await analyzeUrl(fullUrl);
      setResult(analysis);
      saveToHistory(analysis);
    } catch (err) {
      setErrorMsg('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getVerdictIcon = (verdict) => {
    if (verdict === 'Safe') return <FiCheckCircle />;
    if (verdict === 'Suspicious') return <FiAlertTriangle />;
    return <FaSkull />;
  };

  const getVerdictColor = (verdict) => {
    if (verdict === 'Safe') return { bg: '#10b981', light: '#d1fae5' };
    if (verdict === 'Suspicious') return { bg: '#f59e0b', light: '#fed7aa' };
    return { bg: '#ef4444', light: '#fecaca' };
  };

  return (
    <div className="home-main">
      {/* Badge */}
      <div className="home-badge">
        <FiShield />
        <span>DNS Health & Phishing Detector</span>
      </div>
      
      {/* Title */}
      <h1 className="home-title">
        Check if a URL is<br />
        <span className="gradient">safe or malicious</span>
      </h1>
      
      {/* Subtitle */}
      <p className="home-subtitle">
        Real-time 5-layer security analysis • DNS • SSL • WHOIS • Pattern • Redirects
      </p>
      
      {/* Search Form */}
      <form onSubmit={handleScan} className="home-search">
        <div className="search-wrapper">
          <FiGlobe className="search-icon" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze (e.g., google.com)"
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-btn">
            {loading ? <div className="btn-spinner"></div> : 'Analyze URL'}
          </button>
        </div>
        {errorMsg && <div className="search-error">{errorMsg}</div>}
      </form>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-loading"
          >
            <div className="loading-card">
              <div className="loading-spinner"></div>
              <p>Analyzing URL...</p>
              <div className="loading-steps">
                <span>DNS</span>
                <span>SSL</span>
                <span>WHOIS</span>
                <span>Pattern</span>
                <span>Redirects</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="home-results"
          >
            <div className={`result-card ${result.verdict.toLowerCase()}`}>
              <div className="result-verdict">
                <div className="verdict-icon" style={{ background: getVerdictColor(result.verdict).light, color: getVerdictColor(result.verdict).bg }}>
                  {getVerdictIcon(result.verdict)}
                </div>
                <div className="verdict-text">
                  <h2>{result.verdict}</h2>
                  <p>{result.summary}</p>
                </div>
              </div>

              <div className="result-url">
                <FiGlobe />
                <code>{result.url}</code>
              </div>

              <div className="result-risk">
                <div className="risk-circle">
                  <svg width="100" height="100" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle 
                      cx="60" cy="60" r="52" 
                      fill="none" 
                      stroke={getVerdictColor(result.verdict).bg}
                      strokeWidth="8"
                      strokeDasharray="326.56"
                      strokeDashoffset={326.56 * (1 - result.riskScore / 100)}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="risk-text">
                    <span className="risk-number">{result.riskScore}</span>
                    <span className="risk-label">RISK</span>
                  </div>
                </div>
                <div className="risk-info">
                  <h3>Risk Assessment</h3>
                  <div className="risk-bar">
                    <div className="risk-fill" style={{ width: `${result.riskScore}%`, background: getVerdictColor(result.verdict).bg }}></div>
                  </div>
                  <p>
                    {result.riskScore >= 70 ? '⚠️ High Risk - Do not proceed' :
                     result.riskScore >= 35 ? '⚠️ Moderate Risk - Exercise caution' :
                     '✅ Low Risk - URL appears safe'}
                  </p>
                </div>
              </div>

              <div className="result-checks">
                <h3>Security Checks</h3>
                <div className="checks-grid">
                  {result.checks.map((check, idx) => (
                    <div key={idx} className={`check-item ${check.passed ? 'pass' : 'fail'}`}>
                      <span className="check-name">{check.name}</span>
                      <span className="check-status">{check.passed ? '✓' : '✗'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="result-action">
                <button onClick={() => { setUrl(''); setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Scan Another URL <FiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info - Like in picture */}
      <div className="home-footer-info">
        <p>Powered by MERN Stack • Parallel Security Checks • Smart Risk Scoring</p>
      </div>
    </div>
  );
};

export default HomePage;