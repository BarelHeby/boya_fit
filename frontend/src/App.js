import "./App.css";
import User from "./pages/User/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/users";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/users", element: <Users /> },
    { path: "/users/:id", element: <User /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register/>},
  ]);
  return (
    <div className="App w-100 overflow-hidden">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
