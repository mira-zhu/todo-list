import { useState } from 'react';
import { isValidTodoTitle } from '../../utils/todoValidation.js';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

function TodoListItem ({todo, onCompleteTodo, onUpdateTodo}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setIsEditing(false);
    setWorkingTitle(todo.title);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    if (!isEditing) {
      return false;
    }
    
    event.preventDefault();
    onUpdateTodo({
      id: todo.id,
      title: workingTitle,
      isCompleted: todo.isCompleted,
    });
    setIsEditing(false);
  }

  return (
    <li>
      <form>
        { isEditing ? (
          <>
            <TextInputWithLabel 
              value={workingTitle} 
              onChange={(event) => handleEdit(event)}
            />
            <button
              type="button"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!isValidTodoTitle(workingTitle)}
              onClick={(event) => handleUpdate(event)}
            >
              Update
            </button>
          </>
        ) : (
            <>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
              <span onClick={() => setIsEditing(true)}>{todo.title}</span>
            </>
          )}
      </form>
    </li>
  );
}

export default TodoListItem;