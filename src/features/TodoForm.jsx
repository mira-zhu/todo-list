import { useRef, useState } from 'react';
import { isValidTodoTitle } from '../utils/todoValidation.js';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';

function TodoForm({ onAddTodo }) {

  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (workingTodoTitle) {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
    
  }

  return (
     <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button 
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
     </form>
  );
}

export default TodoForm;