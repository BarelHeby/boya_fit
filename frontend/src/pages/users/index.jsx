import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import UserCard from "./UserCard";
import UserModel from "../../models/User";
import UserCard from "./UserCard";
import { Form } from "react-bootstrap";
function Users() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetch_users() {
      const resp = await UserModel.get();
      setUsers(resp);
      setFilteredUsers(resp);
    }
    fetch_users();
  }, []);
  function updateFilteredUsers(e) {
    const val = e.target.value;
    if (val === "") {
      setFilteredUsers(users);
    }
    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(val.toLowerCase());
    });
    setFilteredUsers(filtered);
  }
  return (
    <Container>
      <h1>Users</h1>
      <Row className="d-flex justify-content-center">
        <Col xs={10}>
          <Form.Control
            placeholder="Type To Search By Name"
            onChange={updateFilteredUsers}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {filteredUsers.map((user, index) => {
          return (
            <Col
              xs={6}
              md={4}
              lg={2}
              className=" me-2 mt-2 bg-dark text-white rounded"
              key={index}
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
