import React from "react";
import ExerciseModel from "../../models/Exercise";
import { Container, Row, Col } from "react-bootstrap";
import InfoCard from "./InfoCard";
import { Card } from "react-bootstrap";
import cardBackground from "../../images/card_background.jpg";
import StartExercise from "./StartExercise";
function ExerciseDescription({ id }) {
  const [exercise, setExercise] = React.useState(null);
  React.useEffect(() => {
    ExerciseModel.get(id).then((exercise) => {
      if (exercise.length === 0) {
        setExercise(null);
        return;
      }
      setExercise(exercise[0]);
    });
  }, [id]);
  return (
    <Container className="mt-3 mb-3">
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
        <Col>
          <InfoCard
            bg={cardBackground}
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
      </Row>
      <Row className="mt-3">
        <Col>
          <InfoCard title={"Equipment"} content={exercise?.equipmentName} />
        </Col>
        <Col>
          <InfoCard
            title={"Time To Complete (Sec)"}
            content={exercise?.timeSeconds}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        {exercise?.muscles.map((muscle, index) => (
          <Col key={index}>
            <InfoCard title={"Muscle " + (index + 1)} content={muscle.name} />
          </Col>
        ))}
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <StartExercise exercise={exercise} />
        </Col>
      </Row>
    </Container>
  );
}

export default ExerciseDescription;
