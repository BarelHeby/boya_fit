import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

function WorkoutSummary({ exercises }) {
  //   const bodyParts = Array.from(new Set(exercises.map((ex) => ex.bodyPart)));
  console.log(exercises);
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Body Part</th>
          <th>Exercise Name</th>
        </tr>
      </thead>
      <tbody>
        {exercises?.map((ex, index) => {
          return <WorkoutSummaryRow key={index} exercise={ex} />;
        })}
      </tbody>
    </Table>
  );
}

function WorkoutSummaryRow({ exercise }) {
  return (
    <tr>
      <td>{exercise.bodyPartName}</td>
      <td>{exercise.name}</td>
    </tr>
  );
}
export default WorkoutSummary;
