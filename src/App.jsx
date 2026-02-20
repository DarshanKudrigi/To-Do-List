import React, { useEffect, useMemo, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

// Keys used to store data in localStorage.
const TASKS_STORAGE_KEY = 'todo_tasks_v1';
const THEME_STORAGE_KEY = 'todo_theme_v1';

// Filter values for All / Completed / Pending.
const FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
};

// Helper to safely read JSON from localStorage.
function loadFromLocalStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function App() {
  // Load tasks once when the app starts, falling back to an empty list.
  const [tasks, setTasks] = useState(() =>
    loadFromLocalStorage(TASKS_STORAGE_KEY, []),
  );

  // Track which filter is active: all / completed / pending.
  const [filter, setFilter] = useState(FILTERS.ALL);

  // Simple light / dark theme, also stored in localStorage.
  const [theme, setTheme] = useState(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' || saved === 'light' ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  // Whenever tasks change, save them so they persist across refreshes.
  useEffect(() => {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Persist theme selection.
  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Optionally reflect theme on the document for easy global styling.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Add a new task with a simple ID and default fields.
  const handleAddTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((current) => [
      {
        id: Date.now(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  };

  // Toggle the completed flag for a given task.
  const handleToggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Remove a task from the list.
  const handleDeleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  // Edit the text of an existing task.
  const handleEditTask = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, text: trimmed } : task,
      ),
    );
  };

  // Change which filter is currently active.
  const handleChangeFilter = (nextFilter) => {
    setFilter(nextFilter);
  };

  // Switch between light and dark themes.
  const handleToggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  // Compute filtered tasks and counts so the UI can stay simple.
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.COMPLETED:
        return tasks.filter((task) => task.completed);
      case FILTERS.PENDING:
        return tasks.filter((task) => !task.completed);
      case FILTERS.ALL:
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className={`app app--${theme}`}>
      <div className="app-shell">
        <header className="app-header">
          <div>
            <h1 className="app-title">To-Do List</h1>
            <p className="app-subtitle">
              Keep track of what needs to get done.
            </p>
          </div>
        </header>

        <FilterBar
          activeFilter={filter}
          onChangeFilter={handleChangeFilter}
          totalCount={totalCount}
          completedCount={completedCount}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <main className="app-main">
          <TodoForm onAddTask={handleAddTask} />

          {filteredTasks.length === 0 ? (
            <p className="empty-state">
              You don&apos;t have any{' '}
              {filter === FILTERS.ALL
                ? 'tasks yet.'
                : filter === FILTERS.COMPLETED
                  ? 'completed tasks yet.'
                  : 'pending tasks right now.'}
            </p>
          ) : (
            <TodoList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          )}
        </main>

        <footer className="app-footer">
          <span>
            Total: <strong>{totalCount}</strong>
          </span>
          <span>
            Completed: <strong>{completedCount}</strong>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;

