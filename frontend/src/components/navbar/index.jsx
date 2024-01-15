import React from "react";
import { Nav, Navbar } from "react-bootstrap";

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
    </Navbar>
  );
}

export default NavBar;
