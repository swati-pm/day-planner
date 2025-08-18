import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if no stored value exists
 * @returns {[any, function]} - [storedValue, setValue] tuple
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Custom hook for managing task data with localStorage persistence
 * @returns {[array, object]} - [tasks, taskActions] tuple
 */
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('dayPlannerTasks', []);

  const taskActions = {
    addTask: (taskData) => {
      const newTask = {
        id: Date.now().toString(),
        text: taskData.text,
        completed: false,
        priority: taskData.priority || 'medium',
        time: taskData.time || null,
        createdAt: new Date().toISOString()
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
      return newTask;
    },

    updateTask: (taskId, updates) => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        )
      );
    },

    toggleTask: (taskId) => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : null
              }
            : task
        )
      );
    },

    deleteTask: (taskId) => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    },

    clearCompleted: () => {
      setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    },

    clearAll: () => {
      setTasks([]);
    }
  };

  return [tasks, taskActions];
}
