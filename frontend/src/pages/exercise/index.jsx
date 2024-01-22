import React from "react";
import { useParams } from "react-router-dom";
import ExerciseModel from "../../models/Exercise";
import { Container, Row, Col } from "react-bootstrap";
import InfoCard from "./InfoCard";
import { Card } from "react-bootstrap";
// import GoogleMapReact from "google-map-react";
import Map from "react-map-gl";
import Gyms from "./Gyms";
function Exercise() {
  const { id } = useParams();
  const [exercise, setExercise] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    ExerciseModel.get(id).then((exercise) => {
      if (exercise.length === 0) {
        setExercise(null);
        setLoading(false);
        return;
      }
      setExercise(exercise[0]);

      setLoading(false);
    });
  }, [id]);
  return (
    <Container>
      <Card className="mt-3 ">
        <Card.Header>
          <h1 className="text-center">{exercise?.name}</h1>
        </Card.Header>
      </Card>

      <Row className="mt-3">
        <Col>
          <InfoCard title={"Avg Rating"} content={exercise?.rating} />
        </Col>
        <Col>
          <InfoCard title={"Difficulty"} content={exercise?.difficulty} />
        </Col>
        <Col>
          <InfoCard title={"Body Part"} content={exercise?.bodyPartName} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={6}>
          <InfoCard
            title={"Instructions"}
            content={
              <ul>
                {exercise?.instructions?.map((intruction, index) => (
                  <li key={index} className="text-start">
                    <p>{intruction}</p>
                  </li>
                ))}
              </ul>
            }
          />
        </Col>
        <Col>
          <Row>
            <InfoCard title={"Equipment"} content={exercise?.equipmentName} />
          </Row>
          <Row className="mt-3">
            <InfoCard
              title={"Time To Complete (Sec)"}
              content={exercise?.timeSeconds}
            />
          </Row>
        </Col>
      </Row>
      <Row>
        {exercise?.muscles.map((muscle, index) => (
          <Col key={index} className="mt-3">
            <InfoCard title={"Muscle"} content={muscle.name} />
          </Col>
        ))}
      </Row>
      <Row>
        <Gyms exerciseId={id} />
      </Row>
    </Container>
  );
}

export default Exercise;
