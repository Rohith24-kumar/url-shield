import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSkull, FaClock } from 'react-icons/fa';

const VerdictBadge = ({ verdict, summary, timestamp }) => {
  const getIcon = () => {
    if (verdict === 'Safe') return <FaCheckCircle />;
    if (verdict === 'Suspicious') return <FaExclamationTriangle />;
    return <FaSkull />;
  };

  return (
    <div className={`verdict ${verdict.toLowerCase()}`}>
      <div className="verdict-left">
        {getIcon()}
        <div>
          <h2>{verdict}</h2>
          <p>{summary}</p>
        </div>
      </div>
      <div className="verdict-right">
        <FaClock />
        {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default VerdictBadge;
