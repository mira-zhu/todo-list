import './App.css'

function App() {

  const toDoList = [
    {id: 1, title: "learn react"},
    {id: 2, title: "do readings"},
    {id: 3, title: "make soup"},
  ];

  return (
    <div>
      <h1>To Do List</h1>
      <ul>{toDoList.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    </div>
  )
}

export default App
