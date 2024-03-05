import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import User from "../../models/User";
import LastDaysActivity from "./LastDaysActivity";

function UserStats() {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    async function fetchUser() {
      const u = await User.get(id);
      setUser(u.length > 0 ? u[0] : null);
    }
    fetchUser();
  }, [setUser, id]);
  console.log(user);
  return (
    <Container className="mt-3">
      <h1 className="text-center ">User Stats</h1>
      <hr />
      <h3 className="text-center ">{user?.name}</h3>
      <Row>
        <Col>
          <LastDaysActivity id={id} />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default UserStats;
