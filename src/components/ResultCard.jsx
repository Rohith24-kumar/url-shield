import React from 'react';
import { motion } from 'framer-motion';
import { FaLink } from 'react-icons/fa';
import VerdictBadge from './VerdictBadge';
import RiskScore from './RiskScore';
import SecurityChecks from './SecurityChecks';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="result-card"
    >
      <VerdictBadge 
        verdict={result.verdict} 
        summary={result.summary} 
        timestamp={result.timestamp} 
      />
      
      <div className="result-url">
        <FaLink />
        <code>{result.url}</code>
      </div>
      
      <RiskScore riskScore={result.riskScore} verdict={result.verdict} />
      
      <SecurityChecks checks={result.checks} />
    </motion.div>
  );
};

export default ResultCard;