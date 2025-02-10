import React, { useState } from 'react';
import { TimerSession } from '../types';
import { formatDuration } from '../utils';
import { BarChart, Clock, Trash2, AlertCircle } from 'lucide-react';

interface SummaryProps {
  sessions: TimerSession[];
  totalDuration: number;
  onDeleteSession?: (id: string) => void;
  onClearAll?: () => void;
}

export function Summary({ sessions, totalDuration, onDeleteSession, onClearAll }: SummaryProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const today = new Date().toLocaleDateString();
  const todaySessions = sessions.filter(
    session => new Date(session.startTime).toLocaleDateString() === today
  );

  const handleClearAll = () => {
    if (showConfirmClear) {
      onClearAll?.();
      setShowConfirmClear(false);
    } else {
      setShowConfirmClear(true);
    }
  };

  return (
    <div className="card card-hover p-4 h-full">
      <div className="relative h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <BarChart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
              Today's Summary
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <span className="font-mono text-violet-600 dark:text-violet-400">{formatDuration(totalDuration)}</span>
            </div>
            {sessions.length > 0 && (
              <button
                onClick={handleClearAll}
                className={`btn ${
                  showConfirmClear
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {showConfirmClear ? (
                  <>
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    Confirm Clear
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Clear All
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {todaySessions.map((session, index) => (
            <div
              key={session.id}
              className="group relative border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-violet-500 dark:hover:border-violet-500/50 transition-all hover:shadow-lg dark:hover:shadow-slate-800/50 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {new Date(session.startTime).toLocaleTimeString()}
                      {session.endTime && (
                        <>
                          <span className="mx-2">→</span>
                          {new Date(session.endTime).toLocaleTimeString()}
                        </>
                      )}
                    </span>
                  </div>
                  {session.category && (
                    <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 text-violet-800 dark:text-violet-300 text-xs font-medium rounded-lg">
                      {session.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {formatDuration(session.duration || 0)}
                  </span>
                  {onDeleteSession && (
                    <button
                      onClick={() => onDeleteSession(session.id)}
                      className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 hover:scale-110 transform duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              {session.notes && (
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{session.notes}</p>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.01] to-indigo-500/[0.01] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}

          {todaySessions.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-xl" />
                <BarChart className="w-16 h-16 text-slate-300 dark:text-slate-600 relative" />
              </div>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                No sessions recorded today
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-500/5 to-indigo-500/5 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
}
