import React from "react";
import { Nav, Navbar } from "react-bootstrap";

function ExerciseSingleNav({ mode, setMode, modes }) {
  return (
    <Navbar
      bg="secondary"
      className="text-white text-center d-flex justify-content-center align-conetnt-start  "
    >
      {modes.map((m, index) => {
        return (
          <Nav.Link
            className="me-5 serif"
            key={index}
            onClick={() => setMode(m)}
          >
            <h3 className={m === mode ? "scale-3 underscore" : ""}>{m}</h3>
          </Nav.Link>
        );
      })}
    </Navbar>
  );
}

export default ExerciseSingleNav;
