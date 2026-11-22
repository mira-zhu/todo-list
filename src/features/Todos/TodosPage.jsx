import { useEffect, useState } from 'react';
import TodoList from './TodoList/TodoList.jsx';
import TodoForm from './TodoForm.jsx';
  
function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos(token) {
      setIsTodoListLoading(true);
      try {
        const params = new URLSearchParams({
          limit: 100,
        });
        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 200) {
          setTodoList(data.tasks);
        } else if (response.status === 401) {
          setError(`401 Unauthorized: ${data?.message}`);
        } else {
          setError(`Error: ${data?.message}`);
        }
      } catch(error) {
        setError(`Error: ${error.name} | ${error.message}`);
      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos(token);
    }
    
  }, [token]);

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList(previous => [newTodo, ...previous]);

    try {
      const response = await fetch("/api/tasks" , {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({ 
          "title": newTodo.title,
          "isCompleted": newTodo.isCompleted,
        })
      });

      const serverTodo = await response.json();

      setTodoList(previous => previous.map(todo => (
        (todo.title === serverTodo.title && todo.isCompleted === serverTodo.isCompleted) ? serverTodo : todo
      )));

    } catch(error) {
      setError(`Failed to add todo: ${error.message}`);
      setTodoList(previous => [...previous.filter((todo) => (todo.id !== newTodo.id))]);
    }
  }

  async function completeTodo(id) {
    for (const todo of todoList) {
      if (todo.id === id) {
        const originalTodo = todo;
        const completedTodo = {...todo, isCompleted: true};
        setTodoList(previous => previous.map(todo => (
          todo.id === id ? completedTodo : todo
        )));

        try {
          const response = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: { 
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": token,
            },
            credentials: "include",
            body: JSON.stringify({ 
              "isCompleted": true,
            })
          });

          const serverTodo = await response.json();

          setTodoList(previous => previous.map(todo => (
            todo.id === serverTodo.id ? serverTodo : todo
          )));

        } catch(error) {
          setError(`Failed to mark todo as completed. ${error.message}`);
          setTodoList(previous => previous.map(todo => (
            todo.id === id ? originalTodo : todo
          )));
        }
      } 
    } 
  }

  async function updateTodo(editedTodo) {
    for (const todo of todoList) {
      if (todo.id === editedTodo.id) {
        const originalTodo = todo;
        setTodoList(previous => previous.map(todo => (
          todo.id === editedTodo.id ? editedTodo : todo
        )));

        try {
          const response = await fetch(`/api/tasks/${editedTodo.id}`, {
            method: "PATCH",
            headers: { 
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": token,
            },
            credentials: "include",
            body: JSON.stringify({
              "title": editedTodo.title, 
              "isCompleted": editedTodo.isCompleted,
            })
          });

          const serverTodo = await response.json();

          setTodoList(previous => previous.map(todo => (
            todo.id === serverTodo.id ? serverTodo : todo
          )));

        } catch(error) {
          setError(`Failed to upload edited todo. ${error.message}`);
          setTodoList(previous => previous.map(todo => (
            todo.id === editedTodo.id ? originalTodo : todo
          )));
        }
      }
    }
  }

  return (
    <div>
      { isTodoListLoading && <p>Loading...</p> }
      { error && 
        <div>
          <p>Error: {error}</p> 
          <button
            type="button"
            onClick={() => setError("")}
          >
            Clear Error
          </button>
        </div>
      }
      <TodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  )
}

export default TodosPage;