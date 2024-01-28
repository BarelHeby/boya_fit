import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import UserHistory from "../../models/UserHistory";
import { clearTodayWorkout } from "../../storage/workout";
function WorkoutSummary({ exercises }) {
  //   const bodyParts = Array.from(new Set(exercises.map((ex) => ex.bodyPart)));
  console.log(exercises);
  const [isLoading, setIsLoading] = React.useState(false);
  const markCompleted = async () => {
    const user = JSON.parse(sessionStorage.getItem("username"));
    setIsLoading(true);
    for (let i = 0; i < exercises.length; i++) {
      const resp = await UserHistory.post(user.id, exercises[i]?.id);
      if (!resp) {
        alert("Something went wrong");
        return;
      }
    }
    setIsLoading(false);
    alert("Workout completed successfully");
    clearTodayWorkout();
    window.location.reload();
  };
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Body Part</th>
            <th>Exercise Name</th>
          </tr>
        </thead>
        <tbody>
          {exercises?.map((ex, index) => {
            return <WorkoutSummaryRow key={index} exercise={ex} />;
          })}
        </tbody>
      </Table>
      <Button
        variant="success"
        className="w-100"
        onClick={markCompleted}
        disabled={isLoading}
      >
        Mark As Completed
      </Button>
    </>
  );
}

function WorkoutSummaryRow({ exercise }) {
  return (
    <tr>
      <td>{exercise.bodyPartName}</td>
      <td>{exercise.name}</td>
    </tr>
  );
}
export default WorkoutSummary;
