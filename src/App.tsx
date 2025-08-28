import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTasks } from './hooks/useTasks';
import { 
  GlobalStyles, 
  Container, 
  theme, 
  LoadingContainer, 
  LoadingSpinner, 
  LoadingText,
  LoadingOverlay,
  ErrorContainer,
  ErrorMessage,
  ActionsSection,
  Button
} from './styles';
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

// Main Day Planner App Component
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
      <Container>
        <Header />
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading your tasks...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  // Show error screen if initialization failed
  if (!initialized && error) {
    return (
      <Container>
        <Header />
        <ErrorContainer>
          <ErrorMessage>
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Unable to connect to server</h3>
            <p>{error}</p>
            <Button 
              variant="primary" 
              onClick={() => taskActions.refresh()}
              disabled={loading}
            >
              {loading ? 'Retrying...' : 'Retry Connection'}
            </Button>
          </ErrorMessage>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
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
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
      
      <TaskList 
        tasks={tasks}
        filter={currentFilter}
        onToggle={handleToggleTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        disabled={loading}
      />
      
      <ActionsSection>
        <Button 
          variant="secondary"
          onClick={handleClearCompleted}
          disabled={loading || tasks.filter(t => t.completed).length === 0}
        >
          <i className="fas fa-trash-alt"></i>
          Clear Completed
        </Button>
        <Button 
          variant="danger"
          onClick={handleClearAll}
          disabled={loading || tasks.length === 0}
        >
          <i className="fas fa-broom"></i>
          Clear All
        </Button>
      </ActionsSection>

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
    </Container>
  );
}

// Main App Component
function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DayPlannerApp />
    </ThemeProvider>
  );
}

export default App;
