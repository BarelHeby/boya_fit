import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import UserCard from "./UserCard";
import UserModel from "../../models/User";
import UserCard from "./UserCard";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetch_users() {
      const resp = await UserModel.get();
      setUsers(resp);
    }
    fetch_users();
  }, []);
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        {users.map((user, index) => {
          return (
            <Col
              xs={6}
              md={4}
              lg={2}
              className="me-2 mt-2 bg-dark text-white rounded"
            >
              <UserCard user={user} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Users;
