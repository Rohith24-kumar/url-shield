import React from 'react';

const RiskScore = ({ riskScore, verdict }) => {
  const getColor = () => {
    if (verdict === 'Safe') return '#10b981';
    if (verdict === 'Suspicious') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="risk-score">
      <div className="score-circle">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle 
            cx="60" cy="60" r="52" 
            fill="none" 
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray="326.56"
            strokeDashoffset={326.56 * (1 - riskScore / 100)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="score-text">
          <span className="score-number">{riskScore}</span>
          <span className="score-label">RISK</span>
        </div>
      </div>
      <div className="score-info">
        <h3>Risk Assessment</h3>
        <div className="risk-bar">
          <div className="risk-fill" style={{ width: `${riskScore}%`, background: getColor() }}></div>
        </div>
        <p>This URL has been analyzed across 5 security layers</p>
      </div>
    </div>
  );
};

export default RiskScore;