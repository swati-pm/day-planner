import React, { useState, useEffect } from 'react';
import type { NotificationProps, NotificationType } from '../types';

export default function Notification({ message, type, onClose }: NotificationProps): React.ReactElement | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      return undefined; // Explicit return for else branch
    }
  }, [message, onClose]);

  const getIcon = (type: NotificationType): string => {
    const icons: Record<NotificationType, string> = {
      success: 'check-circle',
      error: 'exclamation-circle',
      info: 'info-circle',
      warning: 'exclamation-triangle'
    };
    return icons[type] || icons.info;
  };

  const getBackgroundColor = (type: NotificationType): string => {
    const colors: Record<NotificationType, string> = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6',
      warning: '#f59e0b'
    };
    return colors[type] || colors.info;
  };

  if (!message) return null;

  return (
    <div 
      className={`notification notification-${type} ${isVisible ? 'show' : ''}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: 9999,
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '200px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: getBackgroundColor(type)
      }}
    >
      <i className={`fas fa-${getIcon(type)}`}></i>
      <span>{message}</span>
    </div>
  );
}
