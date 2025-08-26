// API service for communicating with the day-planner backend
import type {
  Task,
  BackendTask,
  CreateTaskRequest,
  UpdateTaskRequest,
  BackendCreateTaskRequest,
  BackendUpdateTaskRequest,
  ApiResponse,
  PaginatedResponse,
  TaskStats
} from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// API response handler
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data: ApiResponse<T> = await response.json();
  return data;
};

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('dayplanner_token');
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token and add to headers if available
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    headers,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse<T>(response);
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Data mapping functions
export const mapFrontendToBackend = (frontendTask: CreateTaskRequest | UpdateTaskRequest): BackendCreateTaskRequest | BackendUpdateTaskRequest => {
  const backendTask: any = {
    title: frontendTask.text,
    priority: frontendTask.priority || 'medium',
  };

  // Convert time (HH:MM) to dueDate (full ISO date)
  if (frontendTask.time) {
    const today = new Date();
    const [hours, minutes] = frontendTask.time.split(':');
    today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    backendTask.dueDate = today.toISOString();
  }

  return backendTask;
};

export const mapBackendToFrontend = (backendTask: BackendTask): Task => {
  const frontendTask: Task = {
    id: backendTask.id,
    text: backendTask.title,
    completed: backendTask.completed,
    priority: backendTask.priority,
    time: null, // Initialize as null, will be set below if dueDate exists
    createdAt: backendTask.createdAt,
    updatedAt: backendTask.updatedAt,
  };

  // Convert dueDate to time (HH:MM)
  if (backendTask.dueDate) {
    const date = new Date(backendTask.dueDate);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    frontendTask.time = `${hours}:${minutes}`;
  } else {
    frontendTask.time = null;
  }

  // Add completedAt if task is completed (simulate from backend data)
  if (backendTask.completed && backendTask.updatedAt) {
    frontendTask.completedAt = backendTask.updatedAt;
  }

  return frontendTask;
};

// API functions
export const api = {
  // Health check
  async health(): Promise<ApiResponse<{ status: string; message: string; timestamp: string }>> {
    return apiRequest<{ status: string; message: string; timestamp: string }>('/health');
  },

  // Authentication
  auth: {
    // Google login
    async googleLogin(idToken: string): Promise<ApiResponse<{ user: any; token: string }>> {
      return apiRequest<{ user: any; token: string }>('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      });
    },

    // Get current user
    async getCurrentUser(): Promise<ApiResponse<{ user: any }>> {
      return apiRequest<{ user: any }>('/auth/me');
    },

    // Refresh token
    async refreshToken(): Promise<ApiResponse<{ token: string }>> {
      return apiRequest<{ token: string }>('/auth/refresh', {
        method: 'POST',
      });
    },

    // Logout
    async logout(): Promise<ApiResponse<null>> {
      return apiRequest<null>('/auth/logout', {
        method: 'POST',
      });
    },

    // Verify token
    async verifyToken(): Promise<ApiResponse<{ valid: boolean; user: any }>> {
      return apiRequest<{ valid: boolean; user: any }>('/auth/verify');
    },
  },

  // Tasks
  tasks: {
    // Get all tasks
    async getAll(): Promise<{ tasks: Task[]; pagination: PaginatedResponse<Task>['pagination'] }> {
      const response = await apiRequest<PaginatedResponse<BackendTask>>('/tasks');
      return {
        tasks: response.data!.items.map(mapBackendToFrontend),
        pagination: response.data!.pagination,
      };
    },

    // Get task by ID
    async getById(id: string): Promise<Task> {
      const response = await apiRequest<BackendTask>(`/tasks/${id}`);
      return mapBackendToFrontend(response.data!);
    },

    // Create new task
    async create(taskData: CreateTaskRequest): Promise<Task> {
      const backendData = mapFrontendToBackend(taskData) as BackendCreateTaskRequest;
      const response = await apiRequest<BackendTask>('/tasks', {
        method: 'POST',
        body: JSON.stringify(backendData),
      });
      return mapBackendToFrontend(response.data!);
    },

    // Update task
    async update(id: string, updates: UpdateTaskRequest): Promise<Task> {
      const backendUpdates = mapFrontendToBackend(updates) as BackendUpdateTaskRequest;
      const response = await apiRequest<BackendTask>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(backendUpdates),
      });
      return mapBackendToFrontend(response.data!);
    },

    // Toggle task completion
    async toggle(id: string): Promise<Task> {
      const response = await apiRequest<BackendTask>(`/tasks/${id}/toggle`, {
        method: 'PATCH',
      });
      return mapBackendToFrontend(response.data!);
    },

    // Delete task
    async delete(id: string): Promise<ApiResponse<null>> {
      const response = await apiRequest<null>(`/tasks/${id}`, {
        method: 'DELETE',
      });
      return response;
    },

    // Get task statistics
    async getStats(): Promise<TaskStats> {
      const response = await apiRequest<TaskStats>('/tasks/stats/summary');
      return response.data!;
    },
  },
};

export default api;
