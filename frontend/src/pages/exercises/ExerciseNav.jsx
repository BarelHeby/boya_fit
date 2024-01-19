import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import "./exerciseCard.css";
function ExerciseNav({ setCategory, category, categories }) {
  return (
    <Navbar
      bg="secondary"
      className="text-white text-center d-flex justify-content-center align-conetnt-start  "
    >
      {categories.map((bodyPart, index) => {
        return (
          <Nav.Link
            className="me-5  serif"
            href={`/exercises/${bodyPart}`}
            key={index}
          >
            <h3
              className={
                bodyPart === category ||
                (!category && bodyPart.toLowerCase() === "all")
                  ? "scale-3 underscore"
                  : ""
              }
            >
              {bodyPart}
            </h3>
          </Nav.Link>
        );
      })}
    </Navbar>
  );
}

export default ExerciseNav;
