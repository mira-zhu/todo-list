import { useState } from 'react';
import './App.css';
import Header from './shared/Header.jsx';
import Logon from './features/Logon.jsx';
import TodosPage from './features/Todos/TodosPage.jsx';

function App() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <>
      <Header />
      { token ? (
        <TodosPage token={token}/>
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}   
    </>
  )
}

export default App
