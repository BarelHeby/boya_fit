import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
function Timer({ exercise }) {
  const [isActive, setIsActive] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(exercise?.timeSeconds);
  const [intervalPrivate, setIntervalPrivate] = React.useState(null);
  function startTimer() {
    setIsActive(true);
    const i = setInterval(() => setElapsedTime((prev) => prev - 1), 1000);
    setIntervalPrivate(i);
  }
  function stopTimer() {
    setIsActive(false);
    setElapsedTime(exercise?.timeSeconds);
    clearInterval(intervalPrivate);
  }
  useEffect(() => {
    if (elapsedTime && elapsedTime < 0) {
      stopTimer();
    }
  }, [elapsedTime]);
  return (
    <>
      {!isActive ? (
        <FaPlay
          size={30}
          color="green"
          className="pointer"
          onClick={startTimer}
        />
      ) : (
        <Button
          className="rounded-circle"
          variant={"danger"}
          onClick={stopTimer}
        >
          {elapsedTime}
        </Button>
      )}
      {/* <Button
        className="rounded-circle"
        variant={isActive ? "danger" : "success"}
        onClick={!isActive ? startTimer : stopTimer}
      >
        {!isActive ? "" : elapsedTime}
      </Button> */}
    </>
  );
}

export default Timer;
