import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile(): React.ReactElement {
  const { authState, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-profile')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  if (!authState.user) {
    return <></>;
  }

  return (
    <div className="user-profile">
      <button 
        className="user-profile-button"
        onClick={toggleDropdown}
        title={`Signed in as ${authState.user.name}`}
      >
        {authState.user.picture ? (
          <img 
            src={authState.user.picture} 
            alt={authState.user.name}
            className="user-avatar"
          />
        ) : (
          <div className="user-avatar-placeholder">
            <i className="fas fa-user"></i>
          </div>
        )}
        <span className="user-name">{authState.user.name}</span>
        <i className={`fas fa-chevron-down ${showDropdown ? 'rotated' : ''}`}></i>
      </button>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <div className="user-info">
              {authState.user.picture ? (
                <img 
                  src={authState.user.picture} 
                  alt={authState.user.name}
                  className="user-avatar-large"
                />
              ) : (
                <div className="user-avatar-placeholder-large">
                  <i className="fas fa-user"></i>
                </div>
              )}
              <div className="user-details">
                <h4>{authState.user.name}</h4>
                <p>{authState.user.email}</p>
                {authState.user.verified && (
                  <span className="verified-badge">
                    <i className="fas fa-check-circle"></i>
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="user-dropdown-actions">
            <button 
              className="dropdown-action-btn"
              onClick={closeDropdown}
            >
              <i className="fas fa-user-cog"></i>
              <span>Profile Settings</span>
            </button>
            
            <button 
              className="dropdown-action-btn"
              onClick={closeDropdown}
            >
              <i className="fas fa-download"></i>
              <span>Export Data</span>
            </button>
            
            <div className="dropdown-divider"></div>
            
            <button 
              className="dropdown-action-btn logout-btn"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

