import React from "react";
import { Card } from "react-bootstrap";
const RatingCard = ({ rating }) => {
  console.log(rating);
  const stars = [];
  for (let i = 0; i < rating.rating; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return (
    <Card>
      <Card.Header>
        <h4>{rating.exerciseName}</h4>
      </Card.Header>
      <Card.Body className="card_background text-white">
        <div className="d-flex"> {rating.time?.replace("T", " ")}</div>
        <Card.Text>
          <b>Rating : </b> {stars}
        </Card.Text>
        <Card.Text>{rating.desctiption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RatingCard;
