import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import ExerciseCard from "./ExerciseCard";
function NavRow({ exercises }) {
  const [exerciseIndex, setExerciseIndex] = React.useState(0);
  return (
    <Row className="align-items-center text-center">
      {exercises.length > 0 && (
        <>
          <Col>
            <FaArrowCircleLeft
              className="pointer"
              size={50}
              onClick={() =>
                setExerciseIndex((prev) => (prev > 0 ? prev - 1 : prev))
              }
            />
          </Col>
          <Col xs={8}>
            <Container>
              <ExerciseCard exercise={exercises[exerciseIndex]} />
            </Container>
          </Col>
          <Col>
            <FaArrowAltCircleRight
              className="pointer "
              size={50}
              onClick={() =>
                setExerciseIndex((prev) =>
                  prev < exercises.length - 1 ? prev + 1 : prev
                )
              }
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default NavRow;
