import React, { useState } from 'react';

function TodoForm({ onAddTask }) {
  // Local state for the text inside the input field.
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onAddTask(text);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="todo-submit" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;

