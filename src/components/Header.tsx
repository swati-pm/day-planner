import React, { useState, useEffect } from 'react';
import { Header as StyledHeader, HeaderLeft, HeaderTitle, DateDisplay } from '../styles';

export default function Header(): React.ReactElement {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDate = (): void => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateDate();
    // Update date at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timer = setTimeout(() => {
      updateDate();
      // Then update every 24 hours
      const interval = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledHeader>
      <HeaderLeft>
        <HeaderTitle>
          <i className="fas fa-calendar-day"></i> Day Planner
        </HeaderTitle>
        <DateDisplay>
          <span>{currentDate}</span>
        </DateDisplay>
      </HeaderLeft>
    </StyledHeader>
  );
}
