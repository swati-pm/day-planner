import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationIcon, NotificationMessage, NotificationClose } from '../styles';
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

  if (!message) return null;

  return (
    <NotificationContainer $type={type} $show={isVisible}>
      <NotificationIcon $type={type} className={`fas fa-${getIcon(type)}`} />
      <NotificationMessage>{message}</NotificationMessage>
      <NotificationClose onClick={onClose}>
        <i className="fas fa-times" />
      </NotificationClose>
    </NotificationContainer>
  );
}
