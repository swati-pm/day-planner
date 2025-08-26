import styled from 'styled-components';
import { theme } from './theme';

// Login Page Styles
export const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gradients.backgroundAuth},
              url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80') no-repeat center center fixed;
  background-size: cover;
  padding: ${theme.spacing.xl};
`;

export const LoginContainer = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
`;

export const LoginHeader = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing['4xl']} 0 ${theme.spacing['4xl']};
`;

export const LoginHeaderTitle = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

export const LoginHeaderSubtitle = styled.p`
  color: ${theme.colors.textGray};
  font-size: ${theme.fontSizes.lg};
`;

export const LoginContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['5xl']};
  padding: ${theme.spacing['4xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['3xl']};
  }
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LoginFormTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.semibold};
  color: #1f2937;
  margin-bottom: ${theme.spacing.sm};
`;

export const LoginFormSubtitle = styled.p`
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing['3xl']};
  font-size: ${theme.fontSizes.base};
`;

export const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: #374151;
  cursor: pointer;
  transition: ${theme.transitions.slow};
  margin-bottom: ${theme.spacing['3xl']};
  width: 100%;

  &:hover:not(:disabled) {
    border-color: #4285f4;
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.15);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const GoogleLoginContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const LoginFeatures = styled.div`
  margin-top: ${theme.spacing.xl};
`;

export const LoginFeaturesTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: #1f2937;
  margin-bottom: 15px;
`;

export const LoginFeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LoginFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} 0;
  color: ${theme.colors.textLight};

  i {
    color: ${theme.colors.primary};
    width: 20px;
    text-align: center;
  }
`;

export const LoginIllustration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TaskPreview = styled.div`
  background: #f8fafc;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.sm};
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

export const PreviewHeaderTitle = styled.h4`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: #1f2937;
`;

export const TaskCount = styled.span`
  background: #e0e7ff;
  color: ${theme.colors.primary};
  padding: 4px ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;

export const PreviewTasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const PreviewTask = styled.div<{ $completed?: boolean; $high?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.border};
  opacity: ${({ $completed }) => $completed ? 0.7 : 1};

  span:nth-child(2) {
    text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  }

  .task-priority {
    margin-left: auto;
    padding: 2px ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.medium};
    background: ${({ $high }) => $high ? '#fee2e2' : '#f3f4f6'};
    color: ${({ $high }) => $high ? theme.colors.danger : theme.colors.textLight};
  }
`;

export const LoginFooter = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing['4xl']} ${theme.spacing['4xl']} ${theme.spacing['4xl']};
  color: ${theme.colors.textLight};

  i {
    margin-left: ${theme.spacing.sm};
    color: #4285f4;
  }
`;

// User Profile Styles
export const UserProfile = styled.div`
  position: relative;
`;

export const UserProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  background: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  cursor: pointer;
  transition: ${theme.transitions.slow};
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.medium};

  &:hover {
    background: rgba(79, 70, 229, 0.15);
    border-color: rgba(79, 70, 229, 0.3);
    transform: translateY(-1px);
  }

  .fa-chevron-down {
    font-size: ${theme.fontSizes.xs};
    transition: ${theme.transitions.slow};

    &.rotated {
      transform: rotate(180deg);
    }
  }
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.border};
`;

export const UserAvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 14px;
`;

export const UserName = styled.span`
  font-size: 0.95rem;
  font-weight: ${theme.fontWeights.medium};
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  margin-top: ${theme.spacing.sm};
  min-width: 280px;
  z-index: ${theme.zIndex.dropdown};
  overflow: hidden;
`;

export const UserDropdownHeader = styled.div`
  padding: ${theme.spacing.xl};
  background: #f8fafc;
  border-bottom: 1px solid ${theme.colors.border};
`;

export const UserInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export const UserAvatarLarge = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.border};
`;

export const UserAvatarPlaceholderLarge = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 18px;
`;

export const UserDetails = styled.div`
  h4 {
    margin: 0 0 4px 0;
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.semibold};
    color: #1f2937;
  }

  p {
    margin: 0 0 ${theme.spacing.sm} 0;
    color: ${theme.colors.textLight};
    font-size: ${theme.fontSizes.sm};
  }
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #d1fae5;
  color: #065f46;
  padding: 2px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};

  i {
    font-size: 0.7rem;
  }
`;

export const UserDropdownActions = styled.div`
  padding: ${theme.spacing.sm} 0;
`;

export const DropdownActionButton = styled.button<{ $logout?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: ${theme.transitions.default};
  color: ${({ $logout }) => $logout ? theme.colors.danger : '#374151'};
  font-size: 0.95rem;

  &:hover {
    background: ${({ $logout }) => $logout ? '#fef2f2' : '#f9fafb'};
  }

  i {
    width: 16px;
    text-align: center;
    color: ${({ $logout }) => $logout ? theme.colors.danger : theme.colors.textLight};
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${theme.colors.border};
  margin: ${theme.spacing.sm} 0;
`;

// Auth Loading Screen
export const AuthLoading = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.gradients.backgroundAuth},
              url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80') no-repeat center center fixed;
  background-size: cover;
`;

export const AuthLoadingContent = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['5xl']} ${theme.spacing['4xl']};
  box-shadow: ${theme.shadows.lg};

  h2 {
    color: ${theme.colors.primary};
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.bold};
    margin: ${theme.spacing.xl} 0 ${theme.spacing.sm} 0;
  }

  p {
    color: ${theme.colors.textLight};
    font-size: ${theme.fontSizes.lg};
  }
`;
