import './App.css';
import { useState } from 'react';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

const todos = [
    {id: 1, title: "learn react"},
    {id: 2, title: "do readings"},
    {id: 3, title: "make soup"},
  ];

function App() {

  const [todoList, setTodoList] = useState(todos);
  
  return (
    <div>
      <h1>To Do List</h1>
      <TodoForm />
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App
