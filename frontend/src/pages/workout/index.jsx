import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import songs from "../../sounds/songs";
import { getTodayWorkout } from "../../storage/workout";
import Exercise from "../../models/Exercise";
import NavRow from "./NavRow";
import WorkoutSummary from "./WorkoutSummary";
function Workout() {
  const [exercises, setExercises] = React.useState([]);
  const [totalTime, setTotalTime] = React.useState(null);
  const randInt = Math.floor(Math.random() * songs.length);
  useEffect(() => {
    const workout = getTodayWorkout();
    setExercises(() => workout.map((ex) => Exercise.fromJson(ex)));
    const time = workout.reduce((acc, ex) => {
      return acc + ex.timeSeconds;
    }, 0);
    setTotalTime(time);
  }, []);

  return (
    <Container fluid className="mb-3 me-3 ">
      <h1 className="mt-3 ">Today's Workout</h1>
      <Row className="text-center bg-dark ">
        <iframe
          className="p-0"
          width="100%"
          height="370"
          src={songs[randInt]}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
        ></iframe>
      </Row>
      {/* <hr /> */}
      <Row className="mt-3 ">
        <Col>
          <WorkoutSummary exercises={exercises} />
        </Col>
        <Col xs={9}>
          <Row>
            <Col className="text-center">
              <h4 className="mt-2">
                {" "}
                Estimated Time:{" "}
                {totalTime > 60
                  ? Math.floor(totalTime / 60) + " Minutes"
                  : ""}{" "}
                {totalTime % 60} Seconds
              </h4>
            </Col>
          </Row>
          <Row className="mt-3">
            <NavRow exercises={exercises} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Workout;
