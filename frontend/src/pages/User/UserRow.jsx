import React from "react";
import { Col, Row } from "react-bootstrap";
/**
 *
 * @param {User} user
 * @returns
 */
function UserTop({ user, latestWorkout, completedExercises }) {
  return (
    <Row className="align-items-center text-center">
      <Col xs={3}>
        {user.picture ? (
          <img
            width={90}
            height={90}
            className="rounded-circle "
            src={user?.picture}
            alt="user"
          />
        ) : (
          <></>
        )}
      </Col>
      <Col xs={3}>
        <h3>
          <u>{user.name}</u>
        </h3>
      </Col>
      <Col xs={2}>
        <label>
          <b>Completed Exercises</b>
        </label>
        <br />
        <label>{completedExercises}</label>
      </Col>
      <Col xs={2}>
        <label>
          <b>Last Workout</b>
        </label>
        <br />
        <label>{latestWorkout?.substring(0, 10)}</label>
      </Col>
      <Col xs={2}>
        <label>
          <b>Fitness Level</b>
        </label>
        <br />
        <label>{user.fitnessLevel} (Out Of 5)</label>
      </Col>
    </Row>
  );
}

export default UserTop;
