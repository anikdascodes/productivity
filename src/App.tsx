import React from 'react';
import { Timer } from './components/Timer';
import { Summary } from './components/Summary';
import { DateTime } from './components/DateTime';
import { TodoList } from './components/TodoList';
import { useTimer } from './hooks/useTimer';
import { useTodo } from './hooks/useTodo';
import { Clock } from 'lucide-react';

function App() {
  const {
    isRunning,
    sessions,
    startTimer,
    stopTimer,
    deleteSession,
    clearAllSessions,
    getTotalDuration,
  } = useTimer();

  const {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearAllTodos,
  } = useTodo();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="glass sticky top-0 z-10 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/30">
                <Clock className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                Productivity Timer
              </h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="animate-pulse-scale">
                {isRunning && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Session in Progress</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="h-full grid gap-4">
          <div className="row-span-1">
            <DateTime />
          </div>
          <div className="row-span-3 grid gap-4 lg:grid-cols-2 h-full">
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <Timer
                isRunning={isRunning}
                onStart={startTimer}
                onStop={stopTimer}
              />
              <TodoList
                todos={todos}
                onAdd={addTodo}
                onToggle={toggleTodo}
                onRemove={removeTodo}
                onClearAll={clearAllTodos}
              />
            </div>
            <div className="animate-slide-up">
              <Summary
                sessions={sessions}
                totalDuration={getTotalDuration()}
                onDeleteSession={deleteSession}
                onClearAll={clearAllSessions}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
