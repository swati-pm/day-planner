import React, { useState } from 'react';
import type { TaskItemProps } from '../types';

export default function TaskItem({ task, onToggle, onEdit, onDelete, disabled = false }: TaskItemProps): React.ReactElement {
  const [showActions, setShowActions] = useState<boolean>(false);

  const formatTime = (time: string | null): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const handleToggle = (): void => {
    if (disabled) return;
    onToggle(task.id);
  };

  const handleEdit = (): void => {
    if (disabled) return;
    onEdit(task);
  };

  const handleDelete = (): void => {
    if (disabled) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="task-header">
        <div 
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
        >
          {task.completed && <i className="fas fa-check"></i>}
        </div>
        <div className="task-text">{task.text}</div>
        <div className={`task-priority ${task.priority}`}>
          {task.priority}
        </div>
      </div>
      <div className="task-meta">
        <div className="task-time">
          {task.time && (
            <>
              <i className="fas fa-clock"></i> {formatTime(task.time)}
            </>
          )}
        </div>
        <div className={`task-actions ${showActions ? 'show' : ''}`}>
          <button
            className="task-action-btn"
            onClick={handleEdit}
            title="Edit task"
            disabled={disabled}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="task-action-btn delete"
            onClick={handleDelete}
            title="Delete task"
            disabled={disabled}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
