import styled from 'styled-components';
import { theme } from './theme';

export const NotificationContainer = styled.div<{ 
  $type: 'success' | 'error' | 'warning' | 'info';
  $show: boolean;
}>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ $type }) => {
    switch ($type) {
      case 'success':
        return '#d1fae5';
      case 'error':
        return '#fee2e2';
      case 'warning':
        return '#fef3c7';
      case 'info':
      default:
        return '#dbeafe';
    }
  }};
  border-left: 5px solid ${({ $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'info':
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'success':
        return '#065f46';
      case 'error':
        return '#7f1d1d';
      case 'warning':
        return '#92400e';
      case 'info':
      default:
        return '#1e3a8a';
    }
  }};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadows.md};
  z-index: ${theme.zIndex.modal + 10};
  max-width: 400px;
  word-wrap: break-word;
  transform: ${({ $show }) => $show ? 'translateX(0)' : 'translateX(100%)'};
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

export const NotificationIcon = styled.i<{ $type: 'success' | 'error' | 'warning' | 'info' }>`
  color: ${({ $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'info':
      default:
        return theme.colors.primary;
    }
  }};
  font-size: ${theme.fontSizes.lg};
`;

export const NotificationMessage = styled.span`
  flex: 1;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;

export const NotificationClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.xs};
  transition: ${theme.transitions.default};
  color: currentColor;
  margin-left: auto;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
