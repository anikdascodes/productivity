import { useState, useEffect } from 'react';
import { TimerSession, TimerState } from '../types';

const STORAGE_KEY = 'productivity-timer-sessions';

export function useTimer() {
  const [state, setState] = useState<TimerState>(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    return {
      isRunning: false,
      currentSession: null,
      sessions: savedSessions ? JSON.parse(savedSessions) : [],
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.sessions));
  }, [state.sessions]);

  const startTimer = (category?: string, notes?: string) => {
    if (state.isRunning) return;

    const newSession: TimerSession = {
      id: crypto.randomUUID(),
      startTime: new Date().toISOString(),
      category,
      notes,
    };

    setState({
      ...state,
      isRunning: true,
      currentSession: newSession,
    });
  };

  const stopTimer = () => {
    if (!state.isRunning || !state.currentSession) return;

    const endTime = new Date().toISOString();
    const duration = new Date(endTime).getTime() - new Date(state.currentSession.startTime).getTime();
    
    const completedSession: TimerSession = {
      ...state.currentSession,
      endTime,
      duration,
    };

    setState({
      isRunning: false,
      currentSession: null,
      sessions: [...state.sessions, completedSession],
    });
  };

  const deleteSession = (id: string) => {
    setState({
      ...state,
      sessions: state.sessions.filter(session => session.id !== id),
    });
  };

  const clearAllSessions = () => {
    setState({
      ...state,
      sessions: [],
    });
  };

  const getTotalDuration = () => {
    return state.sessions.reduce((total, session) => total + (session.duration || 0), 0);
  };

  const getSessionsByDay = () => {
    const sessionsByDay = new Map<string, TimerSession[]>();
    
    state.sessions.forEach(session => {
      const date = new Date(session.startTime).toLocaleDateString();
      const existing = sessionsByDay.get(date) || [];
      sessionsByDay.set(date, [...existing, session]);
    });

    return sessionsByDay;
  };

  return {
    isRunning: state.isRunning,
    currentSession: state.currentSession,
    sessions: state.sessions,
    startTimer,
    stopTimer,
    deleteSession,
    clearAllSessions,
    getTotalDuration,
    getSessionsByDay,
  };
}