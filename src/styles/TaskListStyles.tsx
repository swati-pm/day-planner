import styled from 'styled-components';
import { theme } from './theme';

export const TasksSection = styled.section`
  margin-bottom: ${theme.spacing['3xl']};
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const TaskItemContainer = styled.div<{ $completed?: boolean; $disabled?: boolean }>`
  background: ${theme.colors.white};
  border: 2px solid ${({ $completed }) => $completed ? theme.colors.success : theme.colors.borderLight};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  transition: ${theme.transitions.default};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  overflow: hidden;
  opacity: ${({ $completed, $disabled }) => ($completed || $disabled) ? 0.7 : 1};
  pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'auto'};

  &:hover {
    border-color: ${({ $completed }) => $completed ? theme.colors.success : theme.colors.primary};
    transform: ${({ $disabled }) => $disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ $disabled }) => $disabled ? 'none' : theme.shadows.md};
  }

  ${({ $completed }) => $completed && `
    background: #f8fffe;
  `}
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

export const TaskCheckbox = styled.div<{ $checked?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ $checked }) => $checked ? theme.colors.success : '#d1d5db'};
  border-radius: ${theme.borderRadius.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  background: ${({ $checked }) => $checked ? theme.colors.success : 'transparent'};
  color: ${({ $checked }) => $checked ? theme.colors.white : 'transparent'};
  
  &:hover {
    border-color: ${theme.colors.success};
  }
`;

export const TaskText = styled.span<{ $completed?: boolean }>`
  flex: 1;
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${({ $completed }) => $completed ? theme.colors.success : '#1f2937'};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
`;

export const TaskPriorityBadge = styled.span<{ $priority: 'high' | 'medium' | 'low' }>`
  padding: 4px 8px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;

  ${({ $priority }) => {
    switch ($priority) {
      case 'high':
        return `
          background: #fef2f2;
          color: ${theme.colors.danger};
        `;
      case 'medium':
        return `
          background: #fef3c7;
          color: ${theme.colors.warning};
        `;
      case 'low':
        return `
          background: #f0fdf4;
          color: #059669;
        `;
      default:
        return `
          background: #f3f4f6;
          color: ${theme.colors.textLight};
        `;
    }
  }}
`;

export const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

export const TaskTime = styled.div`
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TaskActions = styled.div<{ $show?: boolean }>`
  display: flex;
  gap: ${theme.spacing.sm};
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: ${theme.transitions.default};

  ${TaskItemContainer}:hover & {
    opacity: 1;
  }
`;

export const TaskActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: ${theme.transitions.default};
  color: ${theme.colors.textLight};

  &:hover {
    background: ${({ $variant }) => $variant === 'delete' ? '#fef2f2' : '#f3f4f6'};
    color: ${({ $variant }) => $variant === 'delete' ? theme.colors.danger : theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: #f3f4f6;
      transform: none;
    }
  }
`;
