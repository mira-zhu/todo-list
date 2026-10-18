function TodoList() {

  const todoList = [
    {id: 1, title: "learn react"},
    {id: 2, title: "do readings"},
    {id: 3, title: "make soup"},
  ];

  return (
      <ul>{todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
  );
}

export default TodoList;