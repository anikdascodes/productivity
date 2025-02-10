import { useState, useEffect } from 'react';
import { TodoState, TodoItem } from '../types';

const STORAGE_KEY = 'productivity-timer-todos';

export function useTodo() {
  const [state, setState] = useState<TodoState>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return {
      items: savedTodos ? JSON.parse(savedTodos) : [],
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setState({ items: [...state.items, newTodo] });
  };

  const toggleTodo = (id: string) => {
    setState({
      items: state.items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    });
  };

  const removeTodo = (id: string) => {
    setState({
      items: state.items.filter(item => item.id !== id),
    });
  };

  const clearAllTodos = () => {
    setState({ items: [] });
  };

  return {
    todos: state.items,
    addTodo,
    toggleTodo,
    removeTodo,
    clearAllTodos,
  };
}