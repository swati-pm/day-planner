import React, { useState } from 'react';
import './App.css';
import { useTasks } from './hooks/useTasks';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import type { 
  Task, 
  TaskFilterType, 
  NotificationData, 
  CreateTaskRequest, 
  UpdateTaskRequest 
} from './types';

// Components
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskStats from './components/TaskStats';
import TaskFilterComponent from './components/TaskFilter';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import NotificationComponent from './components/Notification';

// Main Day Planner App Component (Protected)
function DayPlannerApp(): React.ReactElement {
  const [tasksState, taskActions] = useTasks();
  const { tasks, loading, error, initialized } = tasksState;
  const [currentFilter, setCurrentFilter] = useState<TaskFilterType>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [notification, setNotification] = useState<NotificationData>({ message: '', type: 'info' });

  const showNotification = (message: string, type: NotificationData['type'] = 'info'): void => {
    setNotification({ message, type });
  };

  const closeNotification = (): void => {
    setNotification({ message: '', type: 'info' });
    taskActions.clearError(); // Clear API errors when notification is closed
  };

  const handleAddTask = async (taskData: CreateTaskRequest): Promise<void> => {
    try {
      await taskActions.addTask(taskData);
      showNotification('Task added successfully!', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
      showNotification('Failed to add task: ' + errorMessage, 'error');
    }
  };

  const handleToggleTask = async (taskId: string): Promise<void> => {
    try {
      const updatedTask = await taskActions.toggleTask(taskId);
      const message = updatedTask.completed ? 'Task completed!' : 'Task marked as pending';
      showNotification(message, 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
      showNotification('Failed to update task: ' + errorMessage, 'error');
    }
  };

  const handleEditTask = (task: Task): void => {
    setEditingTask(task);
  };

  const handleSaveEdit = async (taskId: string, updates: UpdateTaskRequest): Promise<void> => {
    try {
      await taskActions.updateTask(taskId, updates);
      showNotification('Task updated successfully!', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
      showNotification('Failed to update task: ' + errorMessage, 'error');
    }
  };

  const handleDeleteTask = async (taskId: string): Promise<void> => {
    try {
      await taskActions.deleteTask(taskId);
      showNotification('Task deleted', 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
      showNotification('Failed to delete task: ' + errorMessage, 'error');
    }
  };

  const handleCloseEditModal = (): void => {
    setEditingTask(null);
  };

  const handleClearCompleted = async (): Promise<void> => {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      showNotification('No completed tasks to clear', 'info');
      return;
    }

    if (window.confirm(`Delete ${completedCount} completed task(s)?`)) {
      try {
        const deletedCount = await taskActions.clearCompleted();
        showNotification(`${deletedCount} completed task(s) deleted`, 'success');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to clear completed tasks';
        showNotification('Failed to clear completed tasks: ' + errorMessage, 'error');
      }
    }
  };

  const handleClearAll = async (): Promise<void> => {
    if (tasks.length === 0) {
      showNotification('No tasks to clear', 'info');
      return;
    }

    if (window.confirm(`Delete all ${tasks.length} task(s)?`)) {
      try {
        const deletedCount = await taskActions.clearAll();
        showNotification(`${deletedCount} task(s) deleted`, 'success');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to clear all tasks';
        showNotification('Failed to clear all tasks: ' + errorMessage, 'error');
      }
    }
  };

  // Show loading screen on initial load
  if (!initialized && loading) {
    return (
      <div className="container">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  // Show error screen if initialization failed
  if (!initialized && error) {
    return (
      <div className="container">
        <Header />
        <div className="error-container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Unable to connect to server</h3>
            <p>{error}</p>
            <button 
              className="btn-primary" 
              onClick={() => taskActions.refresh()}
              disabled={loading}
            >
              {loading ? 'Retrying...' : 'Retry Connection'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      
      <TaskInput 
        onAddTask={handleAddTask}
        onShowNotification={showNotification}
        disabled={loading}
      />
      
      <TaskStats tasks={tasks} />
      
      <TaskFilterComponent 
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      
      {loading && !initialized && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <TaskList 
        tasks={tasks}
        filter={currentFilter}
        onToggle={handleToggleTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        disabled={loading}
      />
      
      <div className="actions-section">
        <button 
          className="btn-secondary"
          onClick={handleClearCompleted}
          disabled={loading || tasks.filter(t => t.completed).length === 0}
        >
          <i className="fas fa-trash-alt"></i>
          Clear Completed
        </button>
        <button 
          className="btn-danger"
          onClick={handleClearAll}
          disabled={loading || tasks.length === 0}
        >
          <i className="fas fa-broom"></i>
          Clear All
        </button>
      </div>

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onSave={handleSaveEdit}
        onClose={handleCloseEditModal}
        onShowNotification={showNotification}
      />

      <NotificationComponent
        message={notification.message || error || ''}
        type={error ? 'error' : notification.type}
        onClose={closeNotification}
      />
    </div>
  );
}

// Main App Component with Authentication
function App(): React.ReactElement {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DayPlannerApp />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
