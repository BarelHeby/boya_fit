import "./App.css";
import User from "./pages/User/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import { useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <User />
      {/* <Login setUser={setUser} /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
