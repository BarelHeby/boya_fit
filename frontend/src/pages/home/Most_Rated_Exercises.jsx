import React, { useEffect } from "react";
import Rating from "../../models/Rating";
import { Col, Row } from "react-bootstrap";

function MostRatedExercises() {
  const [mostRatedExercises, setMostRatedExercises] = React.useState([]);
  useEffect(() => {
    async function fetchMostRatedExercises() {
      const mostRatedExercises = await Rating.get_most_rated_exercises();
      setMostRatedExercises(mostRatedExercises);
    }
    fetchMostRatedExercises();
  }, [setMostRatedExercises]);
  return (
    <Row className="justify-content-center">
      {mostRatedExercises?.map(({ bodyPart, exercise, description }, index) => (
        <Col key={index} className="border m-3" xs={2}>
          <h3 className="text-center">{bodyPart}</h3>
          <label className="fw-bold">
            <u>{exercise}</u>
          </label>
          <label>{description}</label>
        </Col>
      ))}
    </Row>
  );
}

export default MostRatedExercises;
