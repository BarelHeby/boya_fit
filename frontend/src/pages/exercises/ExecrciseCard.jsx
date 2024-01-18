import React from "react";
import { Card } from "react-bootstrap";
import Exercise from "../../models/Exercise";
import { FaArrowCircleRight } from "react-icons/fa";
function ExecrciseCard() {
  const e = new Exercise(
    11,
    "dumbbell front raise v. 2",
    "Waist",
    4,
    3.5,
    105,
    "Dumbbell",
    "abs,hip flexors"
  );
  const categories = [
    {
      label: "Difficulty",
      value: "difficulty",
    },
    {
      label: "Avrage Rating",
      value: "rating",
    },
    {
      label: "Time To Complete",
      value: "timeSeconds",
    },
    {
      label: "Equipment",
      value: "equipmentId",
    },
  ];
  return (
    <Card className="border p-3 m-3">
      <Card.Header>
        <Card.Title className="fs-2">dumbbell front raise v. 2</Card.Title>
        <Card.Subtitle className="mb-2 text-muted fs-3">Waist</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {categories.map((category, index) => {
          return (
            <Card.Text className="mb-1 fs-5" key={index}>
              <b>{category.label}:</b> {e[category.value]}
            </Card.Text>
          );
        })}
        <div
          className="position-absolute bottom-0 end-0 me-5 mb-5 d-flex align-content-center pointer "
          onClick={() => (window.location.href = `/exercises/${e.id}`)}
        >
          <Card.Text className="me-2 mt-1 underscore"> View More</Card.Text>
          <FaArrowCircleRight size={30} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ExecrciseCard;
