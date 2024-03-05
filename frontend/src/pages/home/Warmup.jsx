import React, { useEffect } from "react";
import Exercise from "../../models/Exercise";
import { Col, Row } from "react-bootstrap";

function Warmup() {
  const [warmup, setWarmup] = React.useState([]);
  useEffect(() => {
    async function fetchWarmup() {
      const warmup = await Exercise.get_lowest_difficulty();
      setWarmup(warmup);
    }
    fetchWarmup();
  }, [setWarmup]);
  console.log(warmup);
  return (
    <Row className="justify-content-center">
      {warmup?.map((exercise, index) => {
        return (
          <Col key={index} className="border m-3" xs={2}>
            <h3
              className="text-center pointer"
              onClick={() =>
                (window.location.href = "exercises/s/" + exercise.id)
              }
            >
              {exercise.bodyPartName}
            </h3>
            <label className="fw-bold">
              <u>{exercise.name}</u>
            </label>
            <label>{exercise.instructions}</label>
          </Col>
        );
      })}
    </Row>
  );
}

export default Warmup;
