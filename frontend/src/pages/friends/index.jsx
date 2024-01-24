import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import User from "../../models/User";
import RequestCard from "./RequestCard";

function Friends() {
  const [friendsRequests, setfriendsRequests] = React.useState([]);
  const [isAllertHidden, setisAllertHidden] = React.useState(true);
  const [alertContent, setalertContent] = React.useState("");
  async function addFriend(friendId, isAccepted) {
    User.addFriend(user.id, friendId, isAccepted)
      .then((res) => {
        setalertContent(
          isAccepted ? "Added Successfuly" : "Rejected Successfuly"
        );
        setisAllertHidden(false);
        setfriendsRequests(res);
      })
      .catch((err) => {
        setalertContent("Error Occured");
        setisAllertHidden(false);
        console.log(err);
      });
  }

  const user = sessionStorage.getItem("username")
    ? JSON.parse(sessionStorage.getItem("username"))
    : null;
  React.useEffect(() => {
    User.getFriendsRequests(user.id)
      .then((res) => {
        console.log(res);
        setfriendsRequests(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container className="mt-3">
      {!isAllertHidden && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setisAllertHidden(true)}
        >
          {alertContent}
        </Alert>
      )}

      <h1 className="text-center ">Friends Requests</h1>
      <hr />
      {friendsRequests.length === 0 ? (
        <h3 className="text-center ">No Requests</h3>
      ) : (
        friendsRequests.map((friend, index) => (
          <Row
            key={index}
            className="text-center d-flex justify-content-center"
          >
            <Col xs={8} className="mt-3">
              <RequestCard OnResponseFunction={addFriend} user={friend} />
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
}

export default Friends;
