import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
function ExerciseNav() {
  const bodyParts = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
  ];
  return (
    <Navbar
      bg="secondary"
      className="text-white text-center d-flex justify-content-center align-conetnt-start  "
    >
      {bodyParts.map((bodyPart, index) => {
        return (
          <Nav.Link
            className="me-5  "
            href={`/exercises/${bodyPart}`}
            key={index}
          >
            <h2 className={index === 0 ? "scale-3" : ""}>{bodyPart}</h2>
          </Nav.Link>
        );
      })}
    </Navbar>
  );
}

export default ExerciseNav;
