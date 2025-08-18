import { useState, useEffect } from 'react';

export default function Notification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const getIcon = (type) => {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      info: 'info-circle'
    };
    return icons[type] || icons.info;
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
        backgroundColor: type === 'success' ? '#10b981' : 
                        type === 'error' ? '#ef4444' : '#3b82f6'
      }}
    >
      <i className={`fas fa-${getIcon(type)}`}></i>
      <span>{message}</span>
    </div>
  );
}
