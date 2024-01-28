import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import UserHistory from "../../models/UserHistory";
import { addTodayWorkout } from "../../storage/workout";
function StartExercise({ exercise }) {
  const [state, setState] = React.useState("inactive");
  const [startTime, setStartTime] = React.useState(null);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const stopTimer = () => {
    setState("result");
    setStartTime(null);
  };
  const startTimer = () => {
    setState("active");
    setStartTime(Date.now());
  };
  const reset = () => {
    setState("inactive");
    setStartTime(null);
    setElapsedTime(0);
  };
  const saveExercise = async () => {
    setState("inactive");
    setStartTime(null);
    setElapsedTime(0);
    const user = JSON.parse(sessionStorage.getItem("username"));
    const resp = await UserHistory.post(user.id, exercise?.id);
    if (resp) {
      alert("Exercise saved successfully");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };
  const addToWorkout = () => {
    console.log(exercise);
    const tempExercise = { ...exercise };
    tempExercise.bodyPartName = exercise.bodyPartName;
    const resp = addTodayWorkout(tempExercise);
    if (resp) alert("Exercise added to today's workout");
    else alert("Something went wrong, Exercise not added to today's workout");
  };

  React.useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          const new_time = Date.now() - startTime;
          const time_seconds = Math.floor(new_time / 1000);
          if (time_seconds === exercise?.timeSeconds) {
            stopTimer();
          }
          return new_time;
        });
        console.log(elapsedTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);
  const time_seconds = Math.floor(elapsedTime / 1000);
  const delta_from_exercise_seconds = exercise?.timeSeconds - time_seconds;
  return (
    <>
      {state === "inactive" ? (
        <Row>
          <Col>
            <Button variant="success" className="w-100 " onClick={startTimer}>
              Start Exercise
            </Button>
          </Col>
          <Col>
            <Button variant="warning" className="w-100" onClick={addToWorkout}>
              Add To Today's Workout
            </Button>
          </Col>
        </Row>
      ) : state === "active" ? (
        <Button variant="danger" className="w-100" onClick={stopTimer}>
          Stop Exercise ( {delta_from_exercise_seconds} Seconds Left )
        </Button>
      ) : (
        <Row>
          <Col>
            <Button
              variant="success"
              className="w-100 slideInLeft"
              onClick={saveExercise}
            >
              Save Exercise To History
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              className="w-100 slideInRight"
              onClick={reset}
            >
              Discard Exercise
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default StartExercise;
