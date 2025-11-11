
import React, { useState, useEffect } from 'react';

interface ClockProps {
  timezone?: 'UTC' | 'local';
}

const Clock: React.FC<ClockProps> = ({ timezone = 'local' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  if (timezone === 'UTC') {
    options.timeZone = 'UTC';
  }

  return <span>{time.toLocaleTimeString(undefined, options)}</span>;
};

export default Clock;
