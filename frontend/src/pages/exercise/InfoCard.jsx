import React from "react";
import { Card } from "react-bootstrap";

function InfoCard({ title, content }) {
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <h2>{content}</h2>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
