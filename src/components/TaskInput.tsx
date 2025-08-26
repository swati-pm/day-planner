import React, { useState } from 'react';
import { TaskInputSection, InputGroup, TaskInput as StyledTaskInput, TaskTimeInput, TaskPrioritySelect, AddTaskButton } from '../styles';
import type { TaskInputProps, CreateTaskRequest } from '../types';

export default function TaskInput({ onAddTask, onShowNotification, disabled = false }: TaskInputProps): React.ReactElement {
  const [taskText, setTaskText] = useState<string>('');
  const [taskTime, setTaskTime] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleAddTask();
  };

  const handleAddTask = (): void => {
    if (disabled) return;
    
    const text = taskText.trim();
    if (!text) {
      onShowNotification?.('Please enter a task description', 'error');
      return;
    }

    const taskData: CreateTaskRequest = {
      text,
      time: taskTime || null,
      priority: taskPriority
    };

    onAddTask(taskData);
    
    // Clear inputs
    setTaskText('');
    setTaskTime('');
    setTaskPriority('medium');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <TaskInputSection>
      <InputGroup as="form" onSubmit={handleSubmit}>
        <StyledTaskInput
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What do you need to do today?"
          maxLength={100}
          autoFocus
          disabled={disabled}
        />
        <TaskTimeInput
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          title="Set time (optional)"
          disabled={disabled}
        />
        <TaskPrioritySelect
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
          title="Set priority"
          disabled={disabled}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </TaskPrioritySelect>
        <AddTaskButton
          type="button"
          onClick={handleAddTask}
          title="Add task"
          disabled={disabled}
        >
          <i className="fas fa-plus"></i>
        </AddTaskButton>
      </InputGroup>
    </TaskInputSection>
  );
}
