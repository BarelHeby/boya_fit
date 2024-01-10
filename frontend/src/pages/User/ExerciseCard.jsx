import React from "react";
import { Card } from "react-bootstrap";
import "./user.css";
function ExerciseCard() {
  return (
    <Card>
      <Card.Header>
        <h4>3/4 sit-up</h4>
      </Card.Header>
      <Card.Body className="card_background text-white">
        <Card.Text>
          <b>Difficulty:</b> 3
        </Card.Text>
        <Card.Text>
          <b>Last Time:</b> 20
        </Card.Text>
        <Card.Text>
          <b>Body Part</b> Weist
        </Card.Text>
        <Card.Text>
          <b>Muscles:</b> Abs, Obliques, Hip Flexors
        </Card.Text>
        <Card.Text>
          <b>Calories Burned:</b> 10
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;
