import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
function RequestCard({ user, OnResponseFunction }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>
            <img
              alt="user profile"
              className=" ms-2 pointer rounded-circle"
              src={user?.picture}
              width={50}
              height={50}
              onClick={() => (window.location.href = `/users/${user.id}`)}
            />
          </Col>
          <Col xs={7}>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.email}</Card.Text>
          </Col>
          <Col>
            <Row>
              <Col>
                <Button
                  variant="transparent"
                  onClick={() => OnResponseFunction(user.id, true)}
                >
                  <IoCheckmarkCircleOutline size={30} color="green" />
                </Button>
              </Col>
              <Col>
                <Button
                  variant="transparent"
                  onClick={() => OnResponseFunction(user.id, false)}
                >
                  <MdBlockFlipped size={30} color="red" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RequestCard;
