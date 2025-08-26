// Task-related types
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  time: string | null;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string | null;
}

export interface CreateTaskRequest {
  text: string;
  priority?: 'low' | 'medium' | 'high';
  time?: string | null;
}

export interface UpdateTaskRequest {
  text?: string;
  priority?: 'low' | 'medium' | 'high';
  time?: string | null;
  completed?: boolean;
}

// Backend API task format
export interface BackendTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackendCreateTaskRequest {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string | null;
}

export interface BackendUpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string | null;
  completed?: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Task statistics
export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  overdue: number;
}

// Application state types
export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

// Filter types
export type TaskFilterType = 'all' | 'completed' | 'pending' | 'high';

// Notification types
export interface NotificationData {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

// Component prop types
export interface TaskInputProps {
  onAddTask: (taskData: CreateTaskRequest) => Promise<void>;
  onShowNotification?: (message: string, type?: NotificationData['type']) => void;
  disabled?: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
  disabled?: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  filter: TaskFilterType;
  onToggle: (taskId: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
  disabled?: boolean;
}

export interface TaskStatsProps {
  tasks: Task[];
}

export interface TaskFilterProps {
  currentFilter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
}

export interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onSave: (taskId: string, updates: UpdateTaskRequest) => Promise<void>;
  onClose: () => void;
  onShowNotification?: (message: string, type?: NotificationData['type']) => void;
}

export interface NotificationProps {
  message: string;
  type: NotificationData['type'];
  onClose: () => void;
}

// Hook return types
export interface TaskActions {
  refresh: () => Promise<void>;
  addTask: (taskData: CreateTaskRequest) => Promise<Task>;
  updateTask: (taskId: string, updates: UpdateTaskRequest) => Promise<Task>;
  toggleTask: (taskId: string) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<boolean>;
  clearCompleted: () => Promise<number>;
  clearAll: () => Promise<number>;
  clearError: () => void;
  getStats: () => Promise<TaskStats>;
}

export type UseTasksReturn = [TasksState, TaskActions];

// Utility types
export type TaskPriority = Task['priority'];
export type NotificationType = NotificationData['type'];
