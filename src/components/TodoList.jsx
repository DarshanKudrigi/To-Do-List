import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  // Render a list of TodoItem components for the current filter.
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={(newText) => onEditTask(task.id, newText)}
        />
      ))}
    </ul>
  );
}

export default TodoList;

