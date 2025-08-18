import TaskItem from './TaskItem';

export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'high':
        return tasks.filter(task => task.priority === 'high');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    return (
      <div className="tasks-section">
        <div className="empty-state">
          <i className="fas fa-clipboard-list"></i>
          <h3>No tasks yet</h3>
          <p>Add your first task above to get started planning your day!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-section">
      <div className="tasks-list">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
