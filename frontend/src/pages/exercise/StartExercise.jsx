import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import UserHistory from "../../models/UserHistory";

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
        <Button variant="success" className="w-100" onClick={startTimer}>
          Start Exercise
        </Button>
      ) : state === "active" ? (
        <Button variant="danger" className="w-100" onClick={stopTimer}>
          Stop Exercise ( {delta_from_exercise_seconds} Seconds Left )
        </Button>
      ) : (
        <Row>
          <Col>
            <Button variant="success" className="w-100" onClick={saveExercise}>
              Save Exercise To History
            </Button>
          </Col>
          <Col>
            <Button variant="danger" className="w-100" onClick={reset}>
              Discard Exercise
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default StartExercise;
