import React, { useState } from 'react';
import { CheckSquare, Square, Trash2, Plus, AlertCircle } from 'lucide-react';
import { TodoItem } from '../types';

interface TodoListProps {
  todos: TodoItem[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClearAll?: () => void;
}

export function TodoList({ todos, onAdd, onToggle, onRemove, onClearAll }: TodoListProps) {
  const [newTodo, setNewTodo] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleClearAll = () => {
    if (showConfirmClear) {
      onClearAll?.();
      setShowConfirmClear(false);
    } else {
      setShowConfirmClear(true);
    }
  };

  return (
    <div className="card card-hover p-4 h-[calc(100%-theme(space.4)-theme(space.48))]">
      <div className="relative h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
            Todo List
          </h2>
          {todos.length > 0 && onClearAll && (
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
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="input flex-1"
          />
          <button
            type="submit"
            className="btn btn-primary px-4"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-violet-500 dark:hover:border-violet-500/50 transition-all group hover:shadow-lg dark:hover:shadow-slate-800/50 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggle(todo.id)}
                  className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                >
                  {todo.completed ? (
                    <CheckSquare className="w-5 h-5 transition-transform duration-200 transform hover:scale-110" />
                  ) : (
                    <Square className="w-5 h-5 transition-transform duration-200 transform hover:scale-110" />
                  )}
                </button>
                <span 
                  className={`transition-all duration-200 ${
                    todo.completed 
                      ? 'line-through text-slate-400 dark:text-slate-500' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => onRemove(todo.id)}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 hover:scale-110 transform duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-8 animate-fade-in">
              <div className="relative w-12 h-12 mx-auto mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-xl" />
                <Plus className="w-12 h-12 text-slate-300 dark:text-slate-600 relative" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                No todos yet. Add some tasks to get started!
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
}
