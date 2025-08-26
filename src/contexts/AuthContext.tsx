import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, AuthContextType, User, LoginResponse } from '../types';

// Auth action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check for existing token
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Load token from localStorage on app start
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = localStorage.getItem('dayplanner_token');
        const storedUser = localStorage.getItem('dayplanner_user');

        if (storedToken && storedUser) {
          // Verify token is still valid by making a request to /api/auth/me
          const response = await fetch('http://localhost:3001/api/auth/me', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: {
                user: data.data.user,
                token: storedToken,
              },
            });
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('dayplanner_token');
            localStorage.removeItem('dayplanner_user');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
        localStorage.removeItem('dayplanner_token');
        localStorage.removeItem('dayplanner_user');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadStoredAuth();
  }, []);

  // Login function
  const login = async (idToken: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const loginData: LoginResponse = data.data;

      // Store in localStorage
      localStorage.setItem('dayplanner_token', loginData.token);
      localStorage.setItem('dayplanner_user', JSON.stringify(loginData.user));

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: loginData.user,
          token: loginData.token,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    try {
      // Clear localStorage
      localStorage.removeItem('dayplanner_token');
      localStorage.removeItem('dayplanner_user');

      // Update state
      dispatch({ type: 'AUTH_LOGOUT' });

      // Optional: Call backend logout endpoint
      if (authState.token) {
        fetch('http://localhost:3001/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }).catch(console.error); // Don't fail logout if backend call fails
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Still dispatch logout even if there's an error
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Refresh token function
  const refreshToken = async (): Promise<void> => {
    try {
      if (!authState.token) {
        throw new Error('No token to refresh');
      }

      const response = await fetch('http://localhost:3001/api/auth/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed');
      }

      const newToken = data.data.token;

      // Update stored token
      localStorage.setItem('dayplanner_token', newToken);

      // Update state
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: authState.user!,
          token: newToken,
        },
      });
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout(); // Logout if refresh fails
      throw error;
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    authState,
    login,
    logout,
    refreshToken,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
