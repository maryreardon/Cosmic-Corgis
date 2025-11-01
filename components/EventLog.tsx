// Fix: Provide content for EventLog.tsx component.
import React from 'react';

interface EventLogProps {
  logs: string[];
}

const EventLog: React.FC<EventLogProps> = ({ logs }) => {
  return (
    <div className="w-full max-w-lg mt-4 h-32 bg-space-dark/50 p-2 rounded-lg overflow-y-auto border border-slate-600">
      <ul className="text-sm text-slate-300 flex flex-col-reverse">
        {logs.map((log, index) => (
          <li key={index} className="py-1 px-2 border-b border-slate-700/50">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventLog;
