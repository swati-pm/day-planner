export default function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' }
  ];

  return (
    <div className="filter-section">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
          data-filter={filter.key}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
