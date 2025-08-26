import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Google Fonts Import */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  /* Font Awesome Icons */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    background: 
      ${theme.gradients.background},
      url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80') no-repeat center center fixed;
    background-size: cover;
    padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  }

  /* Focus styles for accessibility */
  button:focus,
  input:focus,
  select:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Main container styled component
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  margin-top: ${theme.spacing['4xl']};
  margin-bottom: ${theme.spacing['4xl']};
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing.xl};
    padding: 15px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin: ${theme.spacing.xl};
  }
`;
