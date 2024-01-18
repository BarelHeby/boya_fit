import React from "react";
import ExerciseNav from "./ExerciseNav";
import ExecrciseCard from "./ExecrciseCard";
import Exercise from "../../models/Exercise";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  useEffect(() => {
    async function fetch_exercises() {
      const resp = await Exercise.get();
      setExercises(resp);
      setFilteredExercises(resp);
      console.log(resp);
    }
    fetch_exercises();
  }, []);
  return (
    <>
      <ExerciseNav />
      <Row>
        {exercises.map((exercise, index) => {
          return (
            <Col xs={3} key={index}>
              <ExecrciseCard exercise={exercise} />
            </Col>
          );
        })}
      </Row>
      ;{/* <ExecrciseCard /> */}
    </>
  );
}

export default Exercises;
