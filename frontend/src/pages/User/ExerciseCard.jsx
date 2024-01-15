import React from "react";
import { Card } from "react-bootstrap";
import "./user.css";
function ExerciseCard({ user, exercise, time, body_part }) {
  return (
    <Card className="p-0">
      <Card.Header className="border rounded-top">
        <h4>{exercise.name}</h4>
      </Card.Header>
      <Card.Body className="card_background text-white rounded-bottom">
        <Card.Text>
          <b>Difficulty :</b> {exercise.difficulty}
        </Card.Text>
        <Card.Text>
          <b>Last Time : </b>
          {time}
        </Card.Text>
        <Card.Text>
          <b>Time Completed (Sec) : </b>
          {exercise.timeSeconds}
        </Card.Text>
        <Card.Text>
          <b>Body Part</b> {body_part}
        </Card.Text>
        <Card.Text>
          <b>Calories Burned:</b>{" "}
          {(exercise.calories * 0.2 * user.weight).toFixed(0)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;
