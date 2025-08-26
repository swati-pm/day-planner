import React from 'react';
import type { TaskStatsProps } from '../types';

export default function TaskStats({ tasks }: TaskStatsProps): React.ReactElement {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="stats-section">
      <div className="stat-card">
        <span className="stat-number">{totalTasks}</span>
        <span className="stat-label">Total Tasks</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{completedTasks}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{pendingTasks}</span>
        <span className="stat-label">Pending</span>
      </div>
    </div>
  );
}
