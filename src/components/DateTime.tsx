import React, { useState, useEffect } from 'react';
import { Calendar, Clock as ClockIcon } from 'lucide-react';
import { getFormattedDate, getFormattedTime, getHolidays } from '../utils';

export function DateTime() {
  const [time, setTime] = useState(getFormattedTime());
  const date = getFormattedDate();
  const holidays = getHolidays();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card card-hover p-4">
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <Calendar className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
              {date}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <ClockIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-lg font-mono bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 tabular-nums">
              {time}
            </span>
          </div>
        </div>
        
        {holidays.length > 0 && (
          <div className="mt-2 animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {holidays.map((holiday, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-800 dark:text-red-300 rounded-xl text-sm font-medium shadow-sm animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {holiday}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-500/5 to-indigo-500/5 rounded-full blur-2xl -z-10" />
      </div>
    </div>
  );
}
