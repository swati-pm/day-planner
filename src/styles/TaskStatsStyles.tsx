import styled from 'styled-components';
import { theme } from './theme';

export const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${theme.gradients.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  box-shadow: ${theme.shadows.sm};
`;

export const StatNumber = styled.span`
  display: block;
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: 5px;
`;

export const StatLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  opacity: 0.9;
`;
