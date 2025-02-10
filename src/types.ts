export interface TimerSession {
  id: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  notes?: string;
  category?: string;
}

export interface TimerState {
  isRunning: boolean;
  currentSession: TimerSession | null;
  sessions: TimerSession[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoState {
  items: TodoItem[];
}