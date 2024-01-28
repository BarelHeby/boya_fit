import React from "react";
import { Card } from "react-bootstrap";
import Timer from "./Timer";

function ExerciseCard({ exercise }) {
  return (
    <Card className="shadow">
      <Card.Header className="border rounded-top">
        <h4>{exercise?.name}</h4>
        <small className="text-muted">{exercise?.timeSeconds} Seconds</small>
        <div className="mt-1 mb-1">
          <Timer exercise={exercise} />
        </div>
      </Card.Header>
      <Card.Body className=" rounded-bottom">
        <b>Instructions</b>
        {exercise?.instructions.map((instruction, index) => {
          return (
            <Card.Text key={index} className="mb-1">
              {index + 1}. {instruction}
            </Card.Text>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default ExerciseCard;
