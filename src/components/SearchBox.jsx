import React, { useState } from 'react';
import { FaGlobe, FaMicroscope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SearchBox = ({ onSearch, loading, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="search-card"
    >
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <FaGlobe className="search-icon" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze (e.g., google.com)"
          />
          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : <><FaMicroscope /> Analyze</>}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </motion.div>
  );
};

export default SearchBox;