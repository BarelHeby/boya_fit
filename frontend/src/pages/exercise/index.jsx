import React from "react";
import { useParams } from "react-router-dom";
import ExerciseModel from "../../models/Exercise";

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
  return <div>{exercise ? JSON.stringify(exercise.toJson()) : ""}</div>;
}

export default Exercise;
