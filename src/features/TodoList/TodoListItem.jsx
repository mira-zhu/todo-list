import { useEditableTitle } from '../../hooks/useEditableTitle.jsx';
import { isValidTodoTitle } from '../../utils/todoValidation.js';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

function TodoListItem ({todo, onCompleteTodo, onUpdateTodo}) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  function handleUpdate(event) {
    if (!isEditing) {
      return false;
    }
    event.preventDefault();
    const finalTitle = finishEdit();
    onUpdateTodo({...todo, title: finalTitle});
  }

  return (
    <li>
      <form onSubmit={(event) => handleUpdate(event)}>
        { isEditing ? (
          <>
            <TextInputWithLabel 
              value={workingTitle} 
              onChange={(event) => updateTitle(event.target.value)}
            />
            <button
              type="button"
              onClick={() => cancelEdit()}
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
              <span onClick={() => startEditing()}>{todo.title}</span>
            </>
          )}
      </form>
    </li>
  );
}

export default TodoListItem;