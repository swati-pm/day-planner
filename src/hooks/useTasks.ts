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
 * Custom hook for managing task data with backend API persistence
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

  // Refresh/reload tasks
  const refresh = useCallback(async (): Promise<void> => {
    await loadTasks();
  }, [loadTasks]);

  // Add a new task
  const addTask = useCallback(async (taskData: CreateTaskRequest): Promise<Task> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      
      const newTask = await api.tasks.create(taskData);
      
      setTasksState(prev => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
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
      throw error;
    }
  }, []);

  // Update an existing task
  const updateTask = useCallback(async (taskId: string, updates: UpdateTaskRequest): Promise<Task> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      
      const updatedTask = await api.tasks.update(taskId, updates);
      
      setTasksState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === taskId ? updatedTask : task
        ),
        loading: false,
      }));
      
      return updatedTask;
    } catch (error) {
      console.error('Failed to update task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
      setTasksState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Toggle task completion status
  const toggleTask = useCallback(async (taskId: string): Promise<Task> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      
      const updatedTask = await api.tasks.toggle(taskId);
      
      setTasksState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === taskId ? updatedTask : task
        ),
        loading: false,
      }));
      
      return updatedTask;
    } catch (error) {
      console.error('Failed to toggle task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle task';
      setTasksState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (taskId: string): Promise<boolean> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      
      const success = await api.tasks.delete(taskId);
      
      if (success) {
        setTasksState(prev => ({
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== taskId),
          loading: false,
        }));
      } else {
        setTasksState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to delete task',
        }));
      }
      
      return success;
    } catch (error) {
      console.error('Failed to delete task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
      setTasksState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Clear all completed tasks
  const clearCompleted = useCallback(async (): Promise<number> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      
      const completedTasks = tasksState.tasks.filter(task => task.completed);
      let deletedCount = 0;
      
      // Delete each completed task individually
      for (const task of completedTasks) {
        try {
          await api.tasks.delete(task.id);
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete task ${task.id}:`, error);
        }
      }
      
      // Remove deleted tasks from state
      setTasksState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => !task.completed || !completedTasks.find(ct => ct.id === task.id)),
        loading: false,
      }));
      
      return deletedCount;
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
  }, [tasksState.tasks]);

  // Clear all tasks
  const clearAll = useCallback(async (): Promise<number> => {
    try {
      setTasksState(prev => ({ ...prev, loading: true, error: null }));
      
      const allTasks = tasksState.tasks;
      let deletedCount = 0;
      
      // Delete each task individually
      for (const task of allTasks) {
        try {
          await api.tasks.delete(task.id);
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete task ${task.id}:`, error);
        }
      }
      
      // Clear all tasks from state
      setTasksState(prev => ({
        ...prev,
        tasks: [],
        loading: false,
      }));
      
      return deletedCount;
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
  }, [tasksState.tasks]);

  // Get task statistics
  const getStats = useCallback(async (): Promise<TaskStats> => {
    try {
      return await api.tasks.getStats();
    } catch (error) {
      console.error('Failed to get task stats:', error);
      // Fallback to calculating stats from current tasks
      const total = tasksState.tasks.length;
      const completed = tasksState.tasks.filter(task => task.completed).length;
      const pending = total - completed;
      const highPriority = tasksState.tasks.filter(task => task.priority === 'high' && !task.completed).length;
      
      // Calculate overdue tasks (tasks with time in the past)
      const now = new Date();
      const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Get current time in HH:MM format
      
      const overdue = tasksState.tasks.filter(task => {
        if (task.completed || !task.time) return false;
        
        // For simplicity, assuming all tasks are for today
        // In a real app, you'd have task dates as well
        return task.time < currentTime;
      }).length;

      return {
        total,
        completed,
        pending,
        highPriority,
        overdue,
      };
    }
  }, [tasksState.tasks]);

  // Clear error state
  const clearError = useCallback((): void => {
    setTasksState(prev => ({ ...prev, error: null }));
  }, []);

  const taskActions: TaskActions = {
    refresh,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    clearAll,
    getStats,
    clearError,
  };

  return [tasksState, taskActions];
}