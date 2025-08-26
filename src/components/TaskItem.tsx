import React, { useState } from 'react';
import { 
  TaskItemContainer, 
  TaskHeader, 
  TaskCheckbox, 
  TaskText, 
  TaskPriorityBadge, 
  TaskMeta, 
  TaskTime, 
  TaskActions, 
  TaskActionButton 
} from '../styles';
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
    <TaskItemContainer
      $completed={task.completed}
      $disabled={disabled}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <TaskHeader>
        <TaskCheckbox 
          $checked={task.completed}
          onClick={handleToggle}
        >
          {task.completed && <i className="fas fa-check"></i>}
        </TaskCheckbox>
        <TaskText $completed={task.completed}>{task.text}</TaskText>
        <TaskPriorityBadge $priority={task.priority}>
          {task.priority}
        </TaskPriorityBadge>
      </TaskHeader>
      <TaskMeta>
        <TaskTime>
          {task.time && (
            <>
              <i className="fas fa-clock"></i> {formatTime(task.time)}
            </>
          )}
        </TaskTime>
        <TaskActions $show={showActions}>
          <TaskActionButton
            $variant="edit"
            onClick={handleEdit}
            title="Edit task"
            disabled={disabled}
          >
            <i className="fas fa-edit"></i>
          </TaskActionButton>
          <TaskActionButton
            $variant="delete"
            onClick={handleDelete}
            title="Delete task"
            disabled={disabled}
          >
            <i className="fas fa-trash"></i>
          </TaskActionButton>
        </TaskActions>
      </TaskMeta>
    </TaskItemContainer>
  );
}
