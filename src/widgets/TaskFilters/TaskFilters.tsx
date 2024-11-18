'use client';

import React from 'react';
import styles from './TaskFilters.module.scss';

interface TaskFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filterButton} ${currentFilter === 'all' ? styles.active : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все
      </button>
      <button
        className={`${styles.filterButton} ${currentFilter === 'completed' ? styles.active : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Выполненные
      </button>
      <button
        className={`${styles.filterButton} ${currentFilter === 'not_completed' ? styles.active : ''}`}
        onClick={() => onFilterChange('not_completed')}
      >
        Невыполненные
      </button>
    </div>
  );
};
