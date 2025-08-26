import styled from 'styled-components';
import { theme } from './theme';

export const ModalOverlay = styled.div<{ $show?: boolean }>`
  display: ${({ $show }) => $show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: ${theme.zIndex.modal};
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
`;

export const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  width: 90%;
  max-width: 500px;
  box-shadow: ${theme.shadows.lg};
  animation: slideIn 0.3s ease;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing.xl};
  }
`;

export const ModalHeader = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.xl} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: #1f2937;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSizes['2xl']};
  cursor: pointer;
  color: #9ca3af;
  transition: ${theme.transitions.default};

  &:hover {
    color: #4b5563;
  }
`;

export const ModalBody = styled.div`
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalInput = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.base};
  transition: ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const ModalSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.base};
  transition: ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const ModalFooter = styled.div`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;
`;
