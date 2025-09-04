// API service for communicating with the day-planner backend
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskStats,
  PaginatedResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Backend types (different field names)
interface BackendTask {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BackendCreateTaskRequest {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface BackendUpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface BackendApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mapping functions between frontend and backend types
const mapBackendTaskToFrontend = (backendTask: BackendTask): Task => ({
  id: backendTask.id,
  text: backendTask.title,
  completed: backendTask.completed,
  priority: backendTask.priority,
  time: backendTask.dueDate || null,
  createdAt: backendTask.createdAt,
  updatedAt: backendTask.updatedAt,
});

const mapFrontendCreateToBackend = (frontendRequest: CreateTaskRequest): BackendCreateTaskRequest => ({
  title: frontendRequest.text,
  priority: frontendRequest.priority,
  dueDate: frontendRequest.time || undefined,
});

const mapFrontendUpdateToBackend = (frontendRequest: UpdateTaskRequest): BackendUpdateTaskRequest => ({
  ...(frontendRequest.text !== undefined && { title: frontendRequest.text }),
  ...(frontendRequest.completed !== undefined && { completed: frontendRequest.completed }),
  ...(frontendRequest.priority !== undefined && { priority: frontendRequest.priority }),
  ...(frontendRequest.time !== undefined && { dueDate: frontendRequest.time || undefined }),
});

// API response handler
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data: BackendApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  
  return data.data as T;
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  const config: RequestInit = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please ensure the backend is running.');
    }
    throw error;
  }
};

// API methods
export const api = {
  // Tasks
  tasks: {
    // Get all tasks
    async getAll(): Promise<{ tasks: Task[] }> {
      const response = await apiRequest<PaginatedResponse<BackendTask>>('/tasks');
      return {
        tasks: response.items.map(mapBackendTaskToFrontend)
      };
    },

    // Get task by ID
    async getById(id: string): Promise<Task> {
      const backendTask = await apiRequest<BackendTask>(`/tasks/${id}`);
      return mapBackendTaskToFrontend(backendTask);
    },

    // Create new task
    async create(taskData: CreateTaskRequest): Promise<Task> {
      const backendRequest = mapFrontendCreateToBackend(taskData);
      const backendTask = await apiRequest<BackendTask>('/tasks', {
        method: 'POST',
        body: JSON.stringify(backendRequest),
      });
      return mapBackendTaskToFrontend(backendTask);
    },

    // Update task
    async update(id: string, updates: UpdateTaskRequest): Promise<Task> {
      const backendRequest = mapFrontendUpdateToBackend(updates);
      const backendTask = await apiRequest<BackendTask>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(backendRequest),
      });
      return mapBackendTaskToFrontend(backendTask);
    },

    // Toggle task completion
    async toggle(id: string): Promise<Task> {
      const backendTask = await apiRequest<BackendTask>(`/tasks/${id}/toggle`, {
        method: 'PATCH',
      });
      return mapBackendTaskToFrontend(backendTask);
    },

    // Delete task
    async delete(id: string): Promise<boolean> {
      await apiRequest<null>(`/tasks/${id}`, {
        method: 'DELETE',
      });
      return true;
    },

    // Get task statistics
    async getStats(): Promise<TaskStats> {
      return await apiRequest<TaskStats>('/tasks/stats/summary');
    },
  },

  // Health check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    return await apiRequest<{ status: string; message: string; timestamp: string }>('/health');
  },
};

export default api;
