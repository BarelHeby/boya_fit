import React from "react";
import { useParams } from "react-router-dom";
import ExerciseModel from "../../models/Exercise";
import { Container, Row, Col } from "react-bootstrap";
import InfoCard from "./InfoCard";
import { Card } from "react-bootstrap";
// import GoogleMapReact from "google-map-react";
import cardBackground from "../../images/card_background.jpg";
import Gyms from "./Gyms";
import ExerciseDescription from "./ExerciseDescription";
import ExerciseSingleNav from "./ExerciseSingleNav";
import Reviews from "./Reviews";
function Exercise() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const modes = ["Description", "Gyms", "Reviews"];
  const [mode, setMode] = React.useState(modes[0]);

  return (
    <>
      <ExerciseSingleNav modes={modes} mode={mode} setMode={setMode} />
      {mode === "Description" && <ExerciseDescription id={id} />}
      {mode === "Gyms" && <Gyms exerciseId={id} />}
      {mode === "Reviews" && <Reviews id={id} />}
    </>
  );
}

export default Exercise;
