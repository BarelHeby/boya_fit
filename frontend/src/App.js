import "./App.css";
import User from "./pages/User/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import NavBar from "./components/navbar";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Users from "./pages/users";
import Login from "./pages/login";
function App() {
  const [user, setUser] = useState(null);
  const router = createBrowserRouter([
    { path: "/users", element: <Users /> },
    { path: "/users/:id", element: <User /> },
    { path: "/login", element: <Login /> },
  ]);
  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
