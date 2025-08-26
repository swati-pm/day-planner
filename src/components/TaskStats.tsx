import React from 'react';
import { StatsSection, StatCard, StatNumber, StatLabel } from '../styles';
import type { TaskStatsProps } from '../types';

export default function TaskStats({ tasks }: TaskStatsProps): React.ReactElement {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <StatsSection>
      <StatCard>
        <StatNumber>{totalTasks}</StatNumber>
        <StatLabel>Total Tasks</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{completedTasks}</StatNumber>
        <StatLabel>Completed</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{pendingTasks}</StatNumber>
        <StatLabel>Pending</StatLabel>
      </StatCard>
    </StatsSection>
  );
}
