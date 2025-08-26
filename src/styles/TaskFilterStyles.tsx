import styled from 'styled-components';
import { theme } from './theme';

export const FilterSection = styled.section`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: 25px;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${({ $active }) => $active ? theme.colors.primary : theme.colors.border};
  background: ${({ $active }) => $active ? theme.colors.primary : theme.colors.white};
  color: ${({ $active }) => $active ? theme.colors.white : theme.colors.textGray};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  transition: ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${({ $active }) => $active ? theme.colors.white : theme.colors.primary};
  }
`;
