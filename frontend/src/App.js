import "./App.css";
import User from "./pages/User/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/users";
import Login from "./pages/login";
import Home from "./pages/home";
import Exercises from "./pages/exercises";
import "./styles/animations.css";
import "./styles/scales.css";
import Exercise from "./pages/exercise";
import Friends from "./pages/friends";
import Workout from "./pages/workout";
import UserStats from "./pages/user_stats";
import Register from "./pages/register";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/users", element: <Users /> },
    { path: "/users/:id", element: <User /> },
    { path: "/users/stats/:id", element: <UserStats /> },
    { path: "/users/friends", element: <Friends /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/Exercises", element: <Exercises /> },
    { path: "/Exercises/:category", element: <Exercises /> },
    { path: "/Exercises/s/:id", element: <Exercise /> },
    { path: "/Exercises/m/workout", element: <Workout /> },
  ]);
  return (
    <div className="App w-100 overflow-hidden">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
