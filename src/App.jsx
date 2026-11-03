import './App.css';
import { useState } from 'react';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

function App() {

  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList(previous => [newTodo, ...previous]);
  }

  function completeTodo(id) {
    for (const todo of todoList) {
      if (todo.id === id) {
        const completedTodo = {...todo, isCompleted: true};
        setTodoList(previous => previous.map(todo => (
          todo.id === id ? completedTodo : todo
        )));
        return completedTodo;
      } 
    }
  }
  
  return (
    <div>
      <h1>To Do List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}/>
    </div>
  )
}

export default App
