import React, { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  // Track whether the item is currently being edited.
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleStartEdit = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    onEdit(editText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${task.completed ? 'todo-item--completed' : ''}`}>
      <div className="todo-item-main">
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
          />
          <span className="todo-custom-checkbox" />
        </label>

        {isEditing ? (
          <input
            className="todo-edit-input"
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSaveEdit();
              if (event.key === 'Escape') handleCancelEdit();
            }}
            autoFocus
          />
        ) : (
          <span className="todo-text">{task.text}</span>
        )}
      </div>

      <div className="todo-item-actions">
        {isEditing ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveEdit}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleStartEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;

