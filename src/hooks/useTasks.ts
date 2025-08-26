import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type {
  Task,
  TasksState,
  TaskActions,
  UseTasksReturn,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskStats
} from '../types';

/**
 * Custom hook for managing task data with API persistence
 * @returns {UseTasksReturn} - [tasksState, taskActions] tuple
 */
export function useTasks(): UseTasksReturn {
  const [tasksState, setTasksState] = useState<TasksState>({
    tasks: [],
    loading: false,
    error: null,
    initialized: false,
  });

  // Load tasks from API
  const loadTasks = useCallback(async (): Promise<void> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.tasks.getAll();
      setTasksState(prev => ({
        ...prev,
        tasks: response.tasks,
        loading: false,
        initialized: true,
      }));
    } catch (error) {
      console.error('Failed to load tasks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setTasksState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        initialized: true,
      }));
    }
  }, []);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const taskActions: TaskActions = {
    // Refresh tasks from server
    refresh: loadTasks,

    // Add new task
    addTask: async (taskData: CreateTaskRequest): Promise<Task> => {
      try {
        setTasksState(prev => ({ ...prev, loading: true, error: null }));
        const newTask = await api.tasks.create(taskData);
        
        setTasksState(prev => ({
          ...prev,
          tasks: [newTask, ...prev.tasks],
          loading: false,
        }));
        
        return newTask;
      } catch (error) {
        console.error('Failed to add task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
        setTasksState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error; // Re-throw to handle in component
      }
    },

    // Update task
    updateTask: async (taskId: string, updates: UpdateTaskRequest): Promise<Task> => {
      try {
        setTasksState(prev => ({ ...prev, error: null }));
        const updatedTask = await api.tasks.update(taskId, updates);
        
        setTasksState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task => 
            task.id === taskId ? updatedTask : task
          ),
        }));
        
        return updatedTask;
      } catch (error) {
        console.error('Failed to update task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
        setTasksState(prev => ({
          ...prev,
          error: errorMessage,
        }));
        throw error;
      }
    },

    // Toggle task completion
    toggleTask: async (taskId: string): Promise<Task> => {
      try {
        setTasksState(prev => ({ ...prev, error: null }));
        const updatedTask = await api.tasks.toggle(taskId);
        
        setTasksState(prev => ({
          ...prev,
          tasks: prev.tasks.map(task => 
            task.id === taskId ? updatedTask : task
          ),
        }));
        
        return updatedTask;
      } catch (error) {
        console.error('Failed to toggle task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to toggle task';
        setTasksState(prev => ({
          ...prev,
          error: errorMessage,
        }));
        throw error;
      }
    },

    // Delete task
    deleteTask: async (taskId: string): Promise<boolean> => {
      try {
        setTasksState(prev => ({ ...prev, error: null }));
        await api.tasks.delete(taskId);
        
        setTasksState(prev => ({
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== taskId),
        }));
        
        return true;
      } catch (error) {
        console.error('Failed to delete task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
        setTasksState(prev => ({
          ...prev,
          error: errorMessage,
        }));
        throw error;
      }
    },

    // Clear completed tasks
    clearCompleted: async (): Promise<number> => {
      try {
        setTasksState(prev => ({ ...prev, loading: true, error: null }));
        const completedTasks = tasksState.tasks.filter(task => task.completed);
        
        // Delete each completed task
        await Promise.all(
          completedTasks.map(task => api.tasks.delete(task.id))
        );
        
        setTasksState(prev => ({
          ...prev,
          tasks: prev.tasks.filter(task => !task.completed),
          loading: false,
        }));
        
        return completedTasks.length;
      } catch (error) {
        console.error('Failed to clear completed tasks:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to clear completed tasks';
        setTasksState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },

    // Clear all tasks
    clearAll: async (): Promise<number> => {
      try {
        setTasksState(prev => ({ ...prev, loading: true, error: null }));
        
        // Delete all tasks
        await Promise.all(
          tasksState.tasks.map(task => api.tasks.delete(task.id))
        );
        
        const taskCount = tasksState.tasks.length;
        
        setTasksState(prev => ({
          ...prev,
          tasks: [],
          loading: false,
        }));
        
        return taskCount;
      } catch (error) {
        console.error('Failed to clear all tasks:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to clear all tasks';
        setTasksState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },

    // Clear error state
    clearError: (): void => {
      setTasksState(prev => ({ ...prev, error: null }));
    },

    // Get task statistics
    getStats: async (): Promise<TaskStats> => {
      try {
        const stats = await api.tasks.getStats();
        return stats;
      } catch (error) {
        console.error('Failed to get task statistics:', error);
        throw error;
      }
    },
  };

  return [tasksState, taskActions];
}
