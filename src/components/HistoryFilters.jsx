import React from 'react';
import { FaTrashAlt, FaHistory } from 'react-icons/fa';

const HistoryFilters = ({ filter, onFilterChange, onClear, totalCount }) => {
  const filters = ['all', 'safe', 'suspicious', 'danger'];

  return (
    <div className="history-header">
      <div className="history-title">
        <FaHistory />
        <div>
          <h3>Recent Scans</h3>
          <p>{totalCount} URLs analyzed</p>
        </div>
      </div>
      <div className="history-actions">
        <div className="filters">
          {filters.map(f => (
            <button 
              key={f}
              className={filter === f ? 'active' : ''} 
              onClick={() => onFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="clear-btn" onClick={onClear}>
          <FaTrashAlt /> Clear
        </button>
      </div>
    </div>
  );
};

export default HistoryFilters;