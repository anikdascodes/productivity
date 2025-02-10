import React, { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
import { formatDuration } from '../utils';

interface TimerProps {
  isRunning: boolean;
  onStart: (category?: string, notes?: string) => void;
  onStop: () => void;
}

export function Timer({ isRunning, onStart, onStop }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        setElapsed(prev => prev + 1000);
      }, 1000);
    } else {
      setElapsed(0);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    onStart(category || undefined, notes || undefined);
    setCategory('');
    setNotes('');
  };

  return (
    <div className="card card-hover p-6">
      <div className="text-center space-y-6">
        <div className={`transform transition-transform duration-300 ${isRunning ? 'scale-110' : 'scale-100'}`}>
          <div className="relative w-20 h-20 mx-auto">
            <div className={`absolute inset-0 rounded-full ${isRunning ? 'animate-pulse-scale' : ''} ${
              isRunning 
                ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20' 
                : 'bg-slate-100 dark:bg-slate-700'
            }`} />
            <Clock className="w-10 h-10 absolute inset-0 m-auto text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className={`mt-4 text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
            ${isRunning 
              ? 'from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400' 
              : 'from-slate-600 to-slate-500 dark:from-slate-400 dark:to-slate-500'
            }`}>
            {formatDuration(elapsed)}
          </h2>
        </div>

        {!isRunning && (
          <div className="space-y-4 animate-fade-in">
            <input
              type="text"
              placeholder="Category (optional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            />
            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input"
              rows={2}
            />
          </div>
        )}

        <div className="flex justify-center pt-4">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="btn btn-primary"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Session
            </button>
          ) : (
            <button
              onClick={onStop}
              className="btn btn-danger animate-pulse-scale"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
