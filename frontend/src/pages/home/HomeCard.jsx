import React from "react";
import { Button, Card } from "react-bootstrap";
import "./HomeCard.css";
function HomeCard({ path: { to, label, description }, index }) {
  return (
    <Card >
      <Card.Header as="h5">{label}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Button className="" onClick={() => (window.location.href = to)}>
          Go
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
