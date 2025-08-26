import React, { useState, useEffect } from 'react';
import type { EditTaskModalProps, UpdateTaskRequest } from '../types';

export default function EditTaskModal({ task, isOpen, onSave, onClose, onShowNotification }: EditTaskModalProps): React.ReactElement | null {
  const [taskText, setTaskText] = useState<string>('');
  const [taskTime, setTaskTime] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    if (task) {
      setTaskText(task.text);
      setTaskTime(task.time || '');
      setTaskPriority(task.priority);
    }
  }, [task]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSave = (): void => {
    const text = taskText.trim();
    if (!text) {
      onShowNotification?.('Please enter a task description', 'error');
      return;
    }

    if (!task) return;

    const updatedTask: UpdateTaskRequest = {
      text,
      time: taskTime || null,
      priority: taskPriority
    };

    onSave(task.id, updatedTask);
    onShowNotification?.('Task updated successfully!', 'success');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task description"
            maxLength={100}
            autoFocus
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
