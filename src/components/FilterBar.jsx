import React from 'react';

const FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
};

function FilterBar({
  activeFilter,
  onChangeFilter,
  totalCount,
  completedCount,
  theme,
  onToggleTheme,
}) {
  // Helper to render a single filter button with an "active" style.
  const renderFilterButton = (value, label) => (
    <button
      type="button"
      className={`chip ${activeFilter === value ? 'chip--active' : ''}`}
      onClick={() => onChangeFilter(value)}
    >
      {label}
    </button>
  );

  return (
    <section className="filter-bar">
      <div className="filter-bar-left">
        {renderFilterButton(FILTERS.ALL, 'All')}
        {renderFilterButton(FILTERS.PENDING, 'Pending')}
        {renderFilterButton(FILTERS.COMPLETED, 'Completed')}
      </div>

      <div className="filter-bar-center">
        <span className="stats">
          <span>
            Total: <strong>{totalCount}</strong>
          </span>
          <span>
            Completed: <strong>{completedCount}</strong>
          </span>
        </span>
      </div>

      <div className="filter-bar-right">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle dark / light mode"
        >
          <span className="theme-toggle-icon">
            {theme === 'light' ? '🌞' : '🌙'}
          </span>
          <span className="theme-toggle-label">
            {theme === 'light' ? 'Light' : 'Dark'} mode
          </span>
        </button>
      </div>
    </section>
  );
}

export default FilterBar;

