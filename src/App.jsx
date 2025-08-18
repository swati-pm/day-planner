import { useState } from 'react';
import './App.css';
import { useTasks } from './hooks/useLocalStorage';

// Components
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskStats from './components/TaskStats';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import Notification from './components/Notification';

function App() {
  const [tasks, taskActions] = useTasks();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'info' });

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification({ message: '', type: 'info' });
  };

  const handleAddTask = (taskData) => {
    taskActions.addTask(taskData);
  };

  const handleToggleTask = (taskId) => {
    taskActions.toggleTask(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const message = task.completed ? 'Task marked as pending' : 'Task completed!';
      showNotification(message, 'success');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (taskId, updates) => {
    taskActions.updateTask(taskId, updates);
  };

  const handleDeleteTask = (taskId) => {
    taskActions.deleteTask(taskId);
    showNotification('Task deleted', 'info');
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  const handleClearCompleted = () => {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      showNotification('No completed tasks to clear', 'info');
      return;
    }

    if (window.confirm(`Delete ${completedCount} completed task(s)?`)) {
      taskActions.clearCompleted();
      showNotification(`${completedCount} completed task(s) deleted`, 'success');
    }
  };

  const handleClearAll = () => {
    if (tasks.length === 0) {
      showNotification('No tasks to clear', 'info');
      return;
    }

    if (window.confirm(`Delete all ${tasks.length} task(s)?`)) {
      taskActions.clearAll();
      showNotification('All tasks deleted', 'success');
    }
  };

  return (
    <div className="container">
      <Header />
      
      <TaskInput 
        onAddTask={handleAddTask}
        onShowNotification={showNotification}
      />
      
      <TaskStats tasks={tasks} />
      
      <TaskFilter 
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      
      <TaskList 
        tasks={tasks}
        filter={currentFilter}
        onToggle={handleToggleTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      
      <div className="actions-section">
        <button 
          className="btn-secondary"
          onClick={handleClearCompleted}
        >
          <i className="fas fa-trash-alt"></i>
          Clear Completed
        </button>
        <button 
          className="btn-danger"
          onClick={handleClearAll}
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

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </div>
  );
}

export default App;