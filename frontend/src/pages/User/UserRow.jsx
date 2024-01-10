import React from "react";
import { Col, Row } from "react-bootstrap";
function UserTop() {
  return (
    <Row className="align-items-center">
      <Col xs={3}>
        <img
          width={90}
          height={90}
          className="rounded-circle "
          src="https://picsum.photos/200/300"
          alt="user"
        />
      </Col>
      <Col xs={3}>
        <h3>Barel Heby</h3>
      </Col>
      <Col xs={2}>
        <label>
          <b>Points</b>
        </label>
        <br />
        <label>100</label>
      </Col>
      <Col xs={2}>
        <label>
          <b>Last Workout</b>
        </label>
        <br />
        <label>2023-11-10</label>
      </Col>
      <Col xs={2}>
        <label>
          <b>Fitness Level</b>
        </label>
        <br />
        <label>3 (Out Of 5)</label>
      </Col>
    </Row>
  );
}

export default UserTop;
