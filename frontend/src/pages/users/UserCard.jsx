import React from "react";
import { Card, Col, Row } from "react-bootstrap";
function UserCard({ user }) {
  return (
    <Row
      className=" text-center align-items-center  p-3 shadow pointer"
      onClick={() => (window.location.href = `/users/${user.id}`)}
    >
      <Col xs={2}>
        <img
          src={user.picture}
          width={80}
          height={80}
          className="rounded-circle  pointer shadow"
          alt="user"
          onClick={() => (window.location.href = `/users/${user.id}`)}
        />
      </Col>
      <Col>
        {/* <Card.Body className="text-center mt-2"> */}
        <Card.Title className="serif fs-4 ">
          <b>{user.name}</b>
        </Card.Title>
        <Card.Text className="mb-0 ">{user.email}</Card.Text>
        <Card.Text>Fitness Level : {user.fitnessLevel}</Card.Text>

        {/* </Card.Body> */}
      </Col>
    </Row>
  );
}

export default UserCard;
