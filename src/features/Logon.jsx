import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';

function Logon({ onSetEmail, onSetToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit (event) {
    event.preventDefault();
    setIsLoggingOn(true);

    try {
      const response = await fetch("/api/users/logon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.status === 200 && data.email && data.csrfToken) {
        onSetEmail(data.email);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
      }
    } catch(error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}> 
      { authError && <p>Login error</p> }
      <TextInputWithLabel
        elementId="email"
        labelText="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextInputWithLabel
        elementId="password"
        labelText="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button 
        type="submit"
        disabled={isLoggingOn}
      >{isLoggingOn ? "Is Loading..." : "Log On" }</button>
    </form>
  )
}

export default Logon;