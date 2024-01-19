import React from "react";
import { Card } from "react-bootstrap";
import { FaArrowCircleRight } from "react-icons/fa";
import "./exerciseCard.css";
import cardBackground from "../../images/card_background.jpg";
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
      className=" m-3 rounded  "
      style={{ height: "390px", overflowY: "hidden" }}
    >
      <img src={cardBackground} alt="..." height={150} />
      <Card.ImgOverlay className="m-0 p-0">
        <Card.Header className="serif bg-transparent" style={{ height: 150 }}>
          <Card.Title className="fs-3 ">{exercise.name}</Card.Title>
          <Card.Subtitle className=" text-muted fs-4">
            {exercise.bodyPartName}
          </Card.Subtitle>
        </Card.Header>
      </Card.ImgOverlay>
      <Card.Body style={{ height: 200, overflowY: "auto" }}>
        {categories.map((category, index) => {
          return (
            <Card.Text className="mb-1 fs-5 " key={index}>
              <b className="serif underscore ">{category.label}:</b>{" "}
              {exercise[category.value]}
            </Card.Text>
          );
        })}
      </Card.Body>
      <Card.Footer className=" d-flex justify-content-end align-items-center ">
        <Card.Text className="me-2 mt-1  border-bottom border-dark ">
          View More
        </Card.Text>
        <FaArrowCircleRight
          size={30}
          className="pump pointer mb-1"
          onClick={() => (window.location.href = `/exercises/${exercise.id}`)}
        />
      </Card.Footer>
    </Card>
  );
}

export default ExecrciseCard;
