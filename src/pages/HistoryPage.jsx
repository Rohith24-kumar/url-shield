import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTrash2, FiLink, FiCalendar, FiTrendingUp, FiCheckCircle, FiAlertTriangle, FiShield } from 'react-icons/fi';
import { FaSkull } from 'react-icons/fa';
import { getHistory, deleteHistory } from '../services/api';

const HistoryPage = ({ scanHistory, setScanHistory }) => {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Load history from backend on mount
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await getHistory();
        setScanHistory(data);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [setScanHistory]);

  const clearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all scan history?')) {
      try {
        await deleteHistory();
        setScanHistory([]);
        localStorage.removeItem('scanHistory');
      } catch (err) {
        console.error('Failed to clear history:', err);
      }
    }
  };

  const getVerdictInfo = (verdict) => {
    if (verdict === 'Safe') return { icon: <FiCheckCircle />, color: '#10b981', bg: '#d1fae5', text: '#065f46' };
    if (verdict === 'Suspicious') return { icon: <FiAlertTriangle />, color: '#f59e0b', bg: '#fed7aa', text: '#92400e' };
    return { icon: <FaSkull />, color: '#ef4444', bg: '#fecaca', text: '#991b1b' };
  };

  const filteredHistory = scanHistory.filter(item => {
    if (filter === 'all') return true;
    return item.verdict.toLowerCase() === filter.toLowerCase();
  });

  const stats = {
    total: scanHistory.length,
    safe: scanHistory.filter(s => s.verdict === 'Safe').length,
    suspicious: scanHistory.filter(s => s.verdict === 'Suspicious').length,
    danger: scanHistory.filter(s => s.verdict === 'Danger').length,
  };

  if (scanHistory.length === 0) {
    return (
      <div className="history-page-pro">
        <div className="page-hero-pro">
          <div className="container-pro">
            <div className="page-hero-content">
              <div className="hero-badge-pro">
                <FiShield /> Scan History
              </div>
              <h1>Your <span className="gradient-text">Scan History</span></h1>
              <p>Track and review all your past URL security analyses</p>
            </div>
          </div>
        </div>
        <div className="container-pro">
          <div className="empty-state-pro">
            <FiClock className="empty-icon-pro" />
            <h3>No Scans Yet</h3>
            <p>Start analyzing URLs on the home page. Your scan history will appear here.</p>
            <a href="/" className="empty-btn-pro">Start Scanning →</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page-pro">
      {/* Hero Section */}
      <div className="page-hero-pro">
        <div className="container-pro">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero-content"
          >
            <div className="hero-badge-pro">
              <FiShield /> Scan History
            </div>
            <h1>Your <span className="gradient-text">Scan History</span></h1>
            <p>Track and review all your past URL security analyses</p>
          </motion.div>
        </div>
      </div>

      <div className="container-pro">
        {/* Stats Cards */}
        <div className="history-stats-pro">
          <div className="history-stat-card total">
            <span className="history-stat-value">{stats.total}</span>
            <span className="history-stat-label">Total Scans</span>
          </div>
          <div className="history-stat-card safe">
            <span className="history-stat-value">{stats.safe}</span>
            <span className="history-stat-label">Safe</span>
          </div>
          <div className="history-stat-card suspicious">
            <span className="history-stat-value">{stats.suspicious}</span>
            <span className="history-stat-label">Suspicious</span>
          </div>
          <div className="history-stat-card danger">
            <span className="history-stat-value">{stats.danger}</span>
            <span className="history-stat-label">Dangerous</span>
          </div>
        </div>

        {/* Controls */}
        <div className="history-controls-pro">
          <div className="filter-buttons-pro">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'safe' ? 'active' : ''} onClick={() => setFilter('safe')}>Safe</button>
            <button className={filter === 'suspicious' ? 'active' : ''} onClick={() => setFilter('suspicious')}>Suspicious</button>
            <button className={filter === 'danger' ? 'active' : ''} onClick={() => setFilter('danger')}>Danger</button>
          </div>
          <button className="clear-history-pro" onClick={clearHistory}>
            <FiTrash2 /> Clear All
          </button>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="no-results-pro">
            <p>No {filter} scans found</p>
          </div>
        ) : (
          <div className="history-list-pro">
            {filteredHistory.map((item, idx) => {
              const verdict = getVerdictInfo(item.verdict);
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="history-card-pro"
                >
                  <div className="history-card-left">
                    <div className="history-verdict-pro" style={{ background: verdict.bg, color: verdict.color }}>
                      {verdict.icon}
                      <span>{item.verdict}</span>
                    </div>
                    <div className="history-url-pro">
                      <FiLink />
                      <span>{item.url}</span>
                    </div>
                  </div>
                  <div className="history-card-right">
                    <div className="history-score-pro" style={{ color: verdict.color }}>
                      <FiTrendingUp />
                      <span>{item.riskScore}</span>
                    </div>
                    <div className="history-date-pro">
                      <FiCalendar />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
