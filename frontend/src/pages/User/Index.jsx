import React from "react";
import { Container } from "react-bootstrap";
import UserRow from "./UserRow";
import ExerciseCard from "./ExerciseCard";
import { Row, Col } from "react-bootstrap";
import RatingCard from "./RatingCard";
function User() {
  const friends = [1, 2, 3, 4, 5, 6];
  const userName = "Barel Heby";
  return (
    <Container className="mt-5">
      <UserRow />
      <hr />
      <Row className="justify-content-center">
        <h4 className="mb-3">
          <u>{userName}'s Friends</u>
        </h4>
        {friends.map((friend, index) => (
          <Col xs={friends.length > 6 ? 1 : 2} key={index}>
            <img
              width={45}
              height={45}
              alt="friend"
              className="rounded-circle "
              src={"https://picsum.photos/200/300?h=" + index}
            />
            <br />
            <label>Friend {friend}</label>
          </Col>
        ))}
      </Row>
      <hr />
      <Row>
        <Col xs={6} className="me-2">
          <h3>Latest Workouts</h3>
          <Row className="mt-2">
            <ExerciseCard />
          </Row>
          <Row className="mt-2">
            <ExerciseCard />
          </Row>
          <Row className="mt-2">
            <ExerciseCard />
          </Row>
          <Row className="mt-2">
            <ExerciseCard />
          </Row>
        </Col>
        <Col>
          <h3>Latest Reviews</h3>
          <Row className="mt-2">
            <RatingCard />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
