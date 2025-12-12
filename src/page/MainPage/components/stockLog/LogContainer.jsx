
import React from 'react';
import LogCard from './LogCard';

export default function LogContainer({ logs }) {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {logs.map(log => (
        <LogCard 
          key={log.id}
          before={log.before}
          trader={log.trader}
          after={log.after}
          time={log.time}
        />
      ))}
    </div>
  );
}
