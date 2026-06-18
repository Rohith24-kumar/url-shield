import React from 'react';
import HistoryFilters from './HistoryFilters';
import HistoryCard from './HistoryCard';

const HistorySection = ({ history, filter, onFilterChange, onClear, onSelect }) => {
  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.verdict.toLowerCase() === filter.toLowerCase();
  });

  if (history.length === 0) return null;

  return (
    <div className="history-section">
      <HistoryFilters 
        filter={filter}
        onFilterChange={onFilterChange}
        onClear={onClear}
        totalCount={history.length}
      />
      <div className="history-grid">
        {filteredHistory.map((item, i) => (
          <HistoryCard key={i} item={item} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default HistorySection;