import styled from 'styled-components';
import { theme } from './theme';

// Header styles
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['3xl']};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 2px solid ${theme.colors.borderLight};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.lg};
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};

  i {
    margin-right: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

export const DateDisplay = styled.div`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textGray};
  font-weight: ${theme.fontWeights.medium};
`;

// Loading styles
export const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto ${theme.spacing.xl};
`;

export const LoadingSpinnerSmall = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #4285f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

export const LoadingText = styled.p`
  color: ${theme.colors.textGray};
  font-size: ${theme.fontSizes.lg};
  margin-top: 15px;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
`;

// Error styles
export const ErrorContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
`;

export const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing['4xl']} ${theme.spacing['3xl']};
  color: ${theme.colors.danger};
  max-width: 500px;
  margin: 0 auto;

  &.inline {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: ${theme.borderRadius.sm};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.xl};
    color: ${theme.colors.danger};
  }

  i {
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing.xl};
    color: #ef4444;

    &.inline {
      font-size: ${theme.fontSizes.base};
      margin-bottom: 0;
    }
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.danger};
  }

  p {
    color: #7f1d1d;
    margin-bottom: ${theme.spacing.xl};
    line-height: 1.5;
  }
`;

export const ErrorClose = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: ${theme.colors.danger};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.xs};
  transition: ${theme.transitions.default};

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`;

// Actions section
export const ActionsSection = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  padding-top: ${theme.spacing.xl};
  border-top: 2px solid ${theme.colors.borderLight};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

// Common button styles
export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: #4b5563;
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.danger};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: #b91c1c;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${theme.colors.border} !important;
    color: #9ca3af !important;
    border-color: #d1d5db !important;
  }
`;

// Empty state
export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  color: #9ca3af;

  i {
    font-size: 4rem;
    margin-bottom: ${theme.spacing.xl};
    opacity: 0.5;
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.textLight};
  }

  p {
    font-size: ${theme.fontSizes.base};
  }
`;
