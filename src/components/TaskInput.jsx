import { useState } from 'react';

export default function TaskInput({ onAddTask, onShowNotification }) {
  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask();
  };

  const handleAddTask = () => {
    const text = taskText.trim();
    if (!text) {
      onShowNotification?.('Please enter a task description', 'error');
      return;
    }

    const taskData = {
      text,
      time: taskTime || null,
      priority: taskPriority
    };

    onAddTask(taskData);
    
    // Clear inputs
    setTaskText('');
    setTaskTime('');
    setTaskPriority('medium');
    
    onShowNotification?.('Task added successfully!', 'success');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="task-input-section">
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What do you need to do today?"
          maxLength={100}
          className="task-input"
          autoFocus
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          title="Set time (optional)"
          className="task-time"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          title="Set priority"
          className="task-priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="button"
          onClick={handleAddTask}
          title="Add task"
          className="add-task-btn"
        >
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
}
