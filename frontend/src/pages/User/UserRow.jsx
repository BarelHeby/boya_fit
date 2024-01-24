import React from "react";
import { Col, Row } from "react-bootstrap";
import { IoMdPersonAdd, IoMdCheckmark, IoMdSend } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import User from "../../models/User";
/**
 *
 * @param {User} user
 * @returns
 */
function UserTop({ user, latestWorkout, completedExercises }) {
  const [status, setStatus] = React.useState("friend");

  async function sendRequest() {
    const loggedUser = JSON.parse(sessionStorage.getItem("username"));
    await User.addFriend(loggedUser.id, user.id, null, true);
    setStatus("request");
  }

  React.useEffect(() => {
    if (!user?.id) return;
    if (!sessionStorage.getItem("username")) {
      setStatus("notLoggedUser");
      return;
    }

    const loggedUser = JSON.parse(sessionStorage.getItem("username"));
    if (loggedUser.id === user?.id) {
      setStatus("sameUser");
      return;
    }
    User.getStatus(loggedUser.id, user?.id)
      .then((res) => {
        setStatus(res);
      })
      .catch((err) => {
        setStatus("notLoggedUser");
      });
  }, [user]);
  return (
    <Row className="align-items-center text-center">
      <Col>
        {status === "loading" ? (
          <></>
        ) : status === "friend" ? (
          <>
            <IoMdCheckmark className=" border  rounded-circle p-2" size={60} />
            <br />
            <small>Friends</small>
          </>
        ) : status === "notLoggedUser" ? (
          <></>
        ) : status === "request" ? (
          <>
            <HiDotsHorizontal
              className=" border  rounded-circle p-2"
              size={60}
            />
            <br />
            <small>Friend Request Pending</small>
          </>
        ) : status === "sameUser" ? (
          <></>
        ) : (
          <>
            <IoMdPersonAdd
              className="pointer border  rounded-circle p-2"
              size={60}
              onClick={sendRequest}
            />
            <br />
            <small>Add Friend</small>
          </>
        )}
      </Col>
      <Col xs={2}>
        {user.picture ? (
          <img
            width={90}
            height={90}
            className="rounded-circle pointer"
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
