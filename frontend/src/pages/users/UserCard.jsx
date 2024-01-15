import React from "react";
import { Card } from "react-bootstrap";
function UserCard({ user }) {
  return (
    <div className=" text-center align-content-center ">
      <img
        src={user.picture}
        width={60}
        height={60}
        className="rounded-circle mt-5 pointer"
        alt="user"
        onClick={() => (window.location.href = `/users/${user.id}`)}
      />
      <Card.Body className="text-center mt-2">
        <Card.Title>{user.name}</Card.Title>
        <Card.Text className="mb-0">{user.email}</Card.Text>
        <Card.Text>Fitness Level : {user.fitnessLevel}</Card.Text>
        <br />
      </Card.Body>
    </div>
  );
}

export default UserCard;
