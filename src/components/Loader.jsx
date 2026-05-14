import React from 'react';
import { motion } from 'framer-motion';
import { GiSecurityGate } from 'react-icons/gi';

const Loader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="loading-card"
    >
      <div className="loader">
        <GiSecurityGate />
      </div>
      <h4>Scanning URL...</h4>
      <div className="loader-bar"></div>
    </motion.div>
  );
};

export default Loader;