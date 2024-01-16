import React from "react";
import { Button, Card } from "react-bootstrap";
import "./HomeCard.css";
function HomeCard({ path: { to, label, description, icon }, index }) {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-content-center mt-1">
        <h5 className="">{label}</h5>
        {icon}
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Button
          variant="dark"
          className="pump"
          onClick={() => (window.location.href = to)}
        >
          Go
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
