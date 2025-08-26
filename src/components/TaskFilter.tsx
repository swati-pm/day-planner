import React from 'react';
import { FilterSection, FilterButton } from '../styles';
import type { TaskFilterProps, TaskFilterType } from '../types';

interface FilterOption {
  key: TaskFilterType;
  label: string;
}

export default function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps): React.ReactElement {
  const filters: FilterOption[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' }
  ];

  return (
    <FilterSection>
      {filters.map(filter => (
        <FilterButton
          key={filter.key}
          $active={currentFilter === filter.key}
          onClick={() => onFilterChange(filter.key)}
          data-filter={filter.key}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FilterSection>
  );
}
