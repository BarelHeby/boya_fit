import React from "react";
import GymModel from "../../models/Gym";
import { Card, Col, Row } from "react-bootstrap";
import ExerciseItemsCard from "./ExerciseItemsCard";
import { IoMdArrowUp } from "react-icons/io";
function Gyms({ exerciseId }) {
  const [gyms, setGyms] = React.useState([]);
  const user = sessionStorage.getItem("username")
    ? JSON.parse(sessionStorage.getItem("username"))
    : null;
  React.useEffect(() => {
    if (user === null) {
      return;
    }
    GymModel.get_by_user_exercise(user.id, exerciseId).then((gyms) => {
      setGyms(gyms?.map((gym) => GymModel.fromJson(gym)));
    });
  }, [exerciseId]);
  console.log(user);
  if (user === null) {
    return (
      <div className="text-center mt-3 ">
        <IoMdArrowUp size={50} className="pump text-end" />
        <br />
        <label className="fs-3 serif"> Login To View Closest Gyms To You</label>
      </div>
    );
  }
  return (
    <Row className="mt-3 d-flex justify-content-center">
      <h2 className="text-center"> Exercise's Supported Gyms </h2>
      {gyms.map((gym, index) => (
        <Col xs={3} key={index}>
          <ExerciseItemsCard
            logo={gym.logo}
            Content={
              <>
                <Card.Title className="text-center">{gym?.name}</Card.Title>
                <Card.Text className="text-center">
                  {gym?.country} ({gym?.countryShortCode})
                </Card.Text>
                <Card.Text className="text-center">{gym?.city}</Card.Text>
                <Card.Text className="text-center">
                  {(gym?.distance / 1000).toFixed(0)} KM From You
                </Card.Text>
              </>
            }
          />
        </Col>
      ))}
    </Row>
  );
}

export default Gyms;
