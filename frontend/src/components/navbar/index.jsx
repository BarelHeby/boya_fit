import React from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { CiUser } from "react-icons/ci";
import boyaLogo from "../../images/logo/boya-white-logo-transparent.png";
import "../../styles/animations.css";
import Login from "./Login";
import { IoIosLogOut } from "react-icons/io";
function NavBar() {
  const user = sessionStorage.getItem("username")
    ? JSON.parse(sessionStorage.getItem("username"))
    : null;
  return (
    <Navbar
      // variant="outline-light"
      bg="dark"
      className="text-white text-center  "
      data-bs-theme="dark"
      style={{ height: 80 }}
    >
      <Navbar.Brand href="/" className="ms-5">
        <img src={boyaLogo} alt="logo" height={40} />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/users" className="active">
          Users
        </Nav.Link>
        <Nav.Link href="/exercises/All" className="active">
          Exercises
        </Nav.Link>
        <Nav.Link href="/ratings" className="active">
          Ratings
        </Nav.Link>
        <Nav.Link href="/user_history" className="active">
          User History
        </Nav.Link>
        <Nav.Link href="/user_exercises" className="active">
          User Exercises
        </Nav.Link>
      </Nav>
      <Nav className="ms-auto me-5 d-flex align-items-center justiify-content-center">
        {user ? (
          <>
            <label className="fs-5">Hello {user.name} | </label>

            <NavItem className="text-center ms-3 me-2 ">
              <CiUser
                color="white"
                size={40}
                className="pointer border-white border rounded-circle p-2"
                onClick={() => (window.location.href = `/users/${user.id}`)}
              />
              <br />
              <small>Profile</small>
            </NavItem>
            <Nav.Link
              className="active text-center ms-2"
              onClick={() => {
                sessionStorage.removeItem("username");
                window.location.href = "/";
              }}
            >
              <IoIosLogOut
                color="white"
                size={40}
                className="pointer border rounded-circle p-2 border-white"
              />
              <br />
              <small>Logout</small>
            </Nav.Link>
          </>
        ) : (
          <>
            <Login />
            <Nav.Link href="/register" className="ms-2">
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
