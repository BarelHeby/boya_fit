import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserRow from "./UserRow";
import ExerciseCard from "./ExerciseCard";
import { Row, Col } from "react-bootstrap";
import RatingCard from "./RatingCard";
import UserModel from "../../models/User";
import UsersHistory from "../../models/UserHistory";
import Rating from "../../models/Rating";
import { useParams } from "react-router-dom";
function User() {
  const { id } = useParams();
  const [mainUser, setMainUser] = useState({});
  const [userHistory, setUserHistory] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    async function fetch_user() {
      const resp = await UserModel.get(id);
      if (resp.length > 0) {
        setMainUser(resp[0]);
      } else {
        alert("User was not found");
        window.location.href = "/";
        setMainUser({});
      }
    }
    async function fetch_user_history() {
      const resp = await UsersHistory.get(id);
      setUserHistory(resp);
    }
    async function fetch_rating() {
      const resp = await Rating.get(id);
      setRatings(resp);
    }
    async function fetch_friends() {
      const resp = await UserModel.getFriends(id);
      setFriends(resp);
    }
    fetch_user();
    fetch_user_history();
    fetch_rating();
    fetch_friends();
  }, [id]);
  return (
    <Container className="mt-5">
      <UserRow
        user={mainUser}
        latestWorkout={userHistory.length > 0 ? userHistory[0].time : "N/A"}
        completedExercises={userHistory.length > 0 ? userHistory.length : "N/A"}
      />
      <hr />
      <Row className="justify-content-center text-center">
        <h4 className="mb-3">
          <u>{mainUser ? mainUser.name + "'s Friends" : ""}</u>
        </h4>
        {friends.map((friend, index) => (
          <Col xs={friends.length > 6 ? 1 : 2} key={index}>
            <img
              width={50}
              height={50}
              alt="friend"
              className="rounded-circle pointer"
              src={friend.picture}
              onClick={() => (window.location.href = `/users/${friend.id}`)}
            />
            <br />
            <label>{friend.name}</label>
          </Col>
        ))}
      </Row>
      <hr />
      <Row>
        <Col xs={6} className="me-2">
          <h3>Latest Workouts</h3>
          {userHistory.map((history, index) => (
            <Row key={index} className="mt-2">
              <ExerciseCard
                exercise={history?.exercise}
                time={history.time?.replace("T", " ")}
                user={mainUser}
                body_part={history?.bodyPart}
              />
            </Row>
          ))}
        </Col>
        <Col>
          <h3>Latest Reviews</h3>
          {ratings.map((rating, index) => (
            <Row key={index} className="mt-2">
              <RatingCard rating={rating} />
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default User;
