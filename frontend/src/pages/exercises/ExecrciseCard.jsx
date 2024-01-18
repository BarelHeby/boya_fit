import React from "react";
import { Card } from "react-bootstrap";
import { FaArrowCircleRight } from "react-icons/fa";
import "./exerciseCard.css";
function ExecrciseCard({ exercise }) {
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
      value: "equipmentName",
    },
  ];
  return (
    <Card
      className="border p-3 m-3"
      style={{ height: "390px", overflowY: "hidden" }}
    >
      <Card.Header className="serif">
        <Card.Title className="fs-2 ">{exercise.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted fs-3">
          {exercise.bodyPartName}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {categories.map((category, index) => {
          return (
            <Card.Text className="mb-1 fs-5" key={index}>
              <b className="serif">{category.label}:</b>{" "}
              {exercise[category.value]}
            </Card.Text>
          );
        })}
        <hr />
        <div
          className="d-flex align-content-center pointer mt-3 justify-content-end"
          onClick={() => (window.location.href = `/exercises/${exercise.id}`)}
        >
          <Card.Text className="me-2 mt-1 underscore"> View More</Card.Text>
          <FaArrowCircleRight size={30} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ExecrciseCard;
