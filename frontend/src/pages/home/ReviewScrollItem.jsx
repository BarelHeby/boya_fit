import React from "react";
import { Card } from "react-bootstrap";
function ReviewScrollItem({ rating }) {
  console.log(rating);
  const stars = [];
  for (let i = 0; i < rating.rating; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center ">
          <small className="pt-0">{rating.time.substr(0, 10)}</small>
          <div>{stars}</div>
        </div>
        <Card.Title
          className="pt-0 mt-0 pointer"
          onClick={() =>
            (window.location.href = `/exercises/${rating.exerciseId}`)
          }
        >
          <div>{rating.exerciseName}</div>
        </Card.Title>
        <Card.Text>{rating.desctiption}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ReviewScrollItem;
