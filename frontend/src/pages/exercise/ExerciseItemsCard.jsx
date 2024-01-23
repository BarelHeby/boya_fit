import React from "react";
import { Card } from "react-bootstrap";

function ExerciseItemsCard({ Content, logo }) {
  return (
    <Card
      className="border rounded"
      style={{ height: 400, overflowY: "scroll" }}
    >
      {logo && (
        <div className="d-flex justify-content-center mt-2 ">
          <img alt={""} className="img" src={logo} width={250} height={200} />
        </div>
      )}
      <Card.Body>{Content}</Card.Body>
    </Card>
  );
}

export default ExerciseItemsCard;
