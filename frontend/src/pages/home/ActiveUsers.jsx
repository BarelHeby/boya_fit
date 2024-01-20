import React, { useEffect, useState } from "react";
import User from "../../models/User";
import { Col } from "react-bootstrap";
function ActiveUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchActiveUsers() {
      const users = await User.getActive();
      console.log(users);
      setUsers(users);
    }
    fetchActiveUsers();
  }, []);

  return (
    <>
      {users?.map(({ user, count }, index) => (
        <Col
          xs={2}
          key={index}
          className="d-flex flex-column align-items-center"
        >
          <small>
            <b>#{index + 1}</b>
          </small>
          <small>Activities : {count}</small>
          <img
            src={user.picture}
            alt="profile"
            className="rounded-circle pointer"
            height={100}
            width={100}
            onClick={() => (window.location.href = `/users/${user.id}`)}
          />
          <label>{user.name}</label>
        </Col>
      ))}
    </>
  );
}

export default ActiveUsers;
