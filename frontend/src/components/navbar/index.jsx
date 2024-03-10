import React, { useEffect } from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import boyaLogo from "../../images/logo/boya-white-logo-transparent.png";
import "../../styles/animations.css";
import Login from "./Login";
import { IoIosLogOut } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import User from "../../models/User";
import { BiDumbbell } from "react-icons/bi";
import { getTodayWorkout, clearTodayWorkout } from "../../storage/workout";
function NavBar() {
  const [friendsRequests, setfriendsRequests] = React.useState([]);
  const user = sessionStorage.getItem("username")
    ? JSON.parse(sessionStorage.getItem("username"))
    : null;
  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem("friendsRequests");
      clearTodayWorkout();
      return;
    }
    User.getFriendsRequests(user.id)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("friendsRequests", JSON.stringify(res));
        setfriendsRequests(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Navbar
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
      </Nav>
      <Nav className="ms-auto me-5 d-flex align-items-center justiify-content-center">
        {user ? (
          <>
            <label className="fs-5">Hello {user.name} | </label>
            <NavItem className="text-center ms-3 me-2 ">
              <span className="badge rounded-circle bg-danger position-absolute bottom-0 mb-4 ms-4  ">
                {getTodayWorkout().length}
              </span>
              <BiDumbbell
                color="white"
                size={40}
                className="pointer border-white border rounded-circle p-2"
                onClick={() => (window.location.href = `/exercises/m/workout`)}
              />

              <br />
              <small>Workout</small>
            </NavItem>
            <NavItem className="text-center ms-3 me-2 ">
              <span className="badge rounded-circle bg-danger position-absolute bottom-0 mb-4 ms-4  ">
                {friendsRequests.length}
              </span>
              <IoIosNotificationsOutline
                color="white"
                size={40}
                className="pointer border-white border rounded-circle p-2"
                onClick={() => (window.location.href = `/users/friends`)}
              />

              <br />
              <small>Alerts</small>
            </NavItem>

            <NavItem className="text-center ms-3 me-2 ">
              <img
                alt="user"
                src={user.picture}
                width={40}
                height={40}
                className="pointer  border rounded-circle "
                onClick={() => (window.location.href = `/users/${user.id}`)}
              />
              <br />
              <small>Profile</small>
            </NavItem>
            <Nav.Link
              className="active text-center ms-2"
              onClick={() => {
                sessionStorage.removeItem("username");
                window.location.reload();
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
