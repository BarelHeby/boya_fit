import "./App.css";
import User from "./pages/User/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/users";
import Login from "./pages/login";
import Home from "./pages/home";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
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
