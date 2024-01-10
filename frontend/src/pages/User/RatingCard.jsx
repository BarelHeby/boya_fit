import React from "react";
import { Card } from "react-bootstrap";
const RatingCard = () => {
  const rating = 3;
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return (
    <Card>
      <Card.Header>
        <h4>archer pull up</h4>
      </Card.Header>
      <Card.Body className="card_background text-white">
        <div className="d-flex"> 2023-11-02 11:45</div>
        <Card.Text>
          <b>Rating:</b> {stars}
        </Card.Text>
        <Card.Text>
          The workout was well-structured and targeted all muscle groups.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RatingCard;
