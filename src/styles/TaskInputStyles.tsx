import styled from 'styled-components';
import { theme } from './theme';

export const TaskInputSection = styled.section`
  margin-bottom: ${theme.spacing['3xl']};
`;

export const InputGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  background: ${theme.colors.white};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  border: 2px solid ${theme.colors.border};
  transition: ${theme.transitions.default};

  &:focus-within {
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;

    & > * {
      width: 100%;
    }
  }
`;

export const TaskInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.base};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.backgroundLight};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TaskTimeInput = styled.select`
  border: none;
  outline: none;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.backgroundLight};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  width: 120px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const TaskPrioritySelect = styled.select`
  border: none;
  outline: none;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.backgroundLight};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  width: 140px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const AddTaskButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: ${theme.transitions.default};
  font-size: ${theme.fontSizes.base};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
