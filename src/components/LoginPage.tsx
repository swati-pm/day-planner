import React from 'react';
import GoogleLogin from './GoogleLogin';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage(): React.ReactElement {
  const { authState, clearError } = useAuth();

  const handleLoginSuccess = () => {
    clearError();
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>
            <i className="fas fa-calendar-day"></i> Day Planner
          </h1>
          <p>Organize your day effectively with our beautiful task manager</p>
        </div>

        <div className="login-content">
          <div className="login-form">
            <h2>Welcome</h2>
            <p>Sign in to access your personal day planner</p>
            
            {authState.error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{authState.error}</span>
                <button onClick={clearError} className="error-close">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            <GoogleLogin 
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              disabled={authState.isLoading}
            />

            <div className="login-features">
              <h3>Features</h3>
              <ul>
                <li>
                  <i className="fas fa-tasks"></i>
                  <span>Create and manage tasks with priorities</span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>Schedule tasks with specific times</span>
                </li>
                <li>
                  <i className="fas fa-chart-bar"></i>
                  <span>Track your productivity with stats</span>
                </li>
                <li>
                  <i className="fas fa-filter"></i>
                  <span>Filter and organize your tasks</span>
                </li>
                <li>
                  <i className="fas fa-cloud"></i>
                  <span>Sync across all your devices</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="login-illustration">
            <div className="task-preview">
              <div className="preview-header">
                <h4>Your Tasks</h4>
                <span className="task-count">3 tasks</span>
              </div>
              <div className="preview-tasks">
                <div className="preview-task high">
                  <div className="task-checkbox"></div>
                  <span>Complete project proposal</span>
                  <span className="task-priority">High</span>
                </div>
                <div className="preview-task completed">
                  <div className="task-checkbox checked">
                    <i className="fas fa-check"></i>
                  </div>
                  <span>Review team feedback</span>
                  <span className="task-priority">Medium</span>
                </div>
                <div className="preview-task">
                  <div className="task-checkbox"></div>
                  <span>Plan weekend activities</span>
                  <span className="task-priority">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>
            Secure authentication powered by Google
            <i className="fab fa-google"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

