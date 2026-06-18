import React from 'react';
import { motion } from 'framer-motion';
import { FaLink, FaClock } from 'react-icons/fa';

const HistoryCard = ({ item, onClick }) => {
  const getVerdictColor = (verdict) => {
    if (verdict === 'Safe') return '#10b981';
    if (verdict === 'Suspicious') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className={`history-item ${item.verdict.toLowerCase()}`}
      onClick={() => onClick(item)}
    >
      <div className="history-item-header">
        <span className="verdict-tag">{item.verdict}</span>
        <span className="risk-tag" style={{ background: getVerdictColor(item.verdict) }}>
          {item.riskScore}
        </span>
      </div>
      <div className="history-item-url">
        <FaLink />
        <span>{item.url.length > 45 ? item.url.substring(0, 45) + '...' : item.url}</span>
      </div>
      <div className="history-item-footer">
        <FaClock />
        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
};

export default HistoryCard;