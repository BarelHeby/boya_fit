import React from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { CiUser } from "react-icons/ci";
function NavBar() {
  return (
    <Navbar bg="dark" className="text-white text-center" data-bs-theme="dark">
      <Navbar.Brand className="ms-5" href="/">
        Home
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/users">Users</Nav.Link>
        <Nav.Link href="/exercises">Exercises</Nav.Link>
        <Nav.Link href="/ratings">Ratings</Nav.Link>
        <Nav.Link href="/user_history">User History</Nav.Link>
        <Nav.Link href="/user_exercises">User Exercises</Nav.Link>
      </Nav>
      <Nav className="ms-auto me-5">
        {sessionStorage.getItem("username") ? (
          <>
            <Nav.Link
              onClick={() => {
                sessionStorage.removeItem("username");
                window.location.href = "/";
              }}
            >
              Logout
            </Nav.Link>
            <NavItem>
              <CiUser
                size={45}
                className="pointer ms-3 me-2 border rounded-circle p-2"
                onClick={() =>
                  (window.location.href = `/users/${
                    JSON.parse(sessionStorage.getItem("username")).id
                  }`)
                }
              />
            </NavItem>
          </>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
