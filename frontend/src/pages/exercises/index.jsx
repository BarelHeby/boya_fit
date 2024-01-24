import React from "react";
import ExerciseNav from "./ExerciseNav";
import ExecrciseCard from "./ExecrciseCard";
import Exercise from "../../models/Exercise";
import { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import cardBackground from "../../images/card_background.jpg";
import { FaArrowCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Exercises() {
  const { category } = useParams();
  const [exercises, setExercises] = useState([]);
  const categories = [
    "All",
    "Waist",
    "Back",
    "Upper Legs",
    "Lower Legs",
    "Chest",
    "Upper Arms",
    "Lower Arms",
    "Shoulders",
    "Neck",
    "Cardio",
  ];
  useEffect(() => {
    async function fetch_exercises() {
      const resp = await Exercise.get(
        `category/${
          category && category.toLowerCase() !== "all"
            ? category.toLowerCase()
            : ""
        }`
      );
      setExercises(resp);
    }

    fetch_exercises();
  }, [category]);
  return (
    <>
      <ExerciseNav category={category} categories={categories} />
      <Container>
        {categories.map((cat, index) => {
          if (cat === "All") return <></>;
          return (
            exercises.filter(
              (exercise) =>
                exercise.bodyPartName.toLowerCase() === cat.toLowerCase()
            ).length > 0 && (
              <Row key={index} className="mt-3">
                <h3>{cat}</h3>
                <hr />
                {exercises
                  .filter(
                    (exercise) =>
                      exercise.bodyPartName.toLowerCase() === cat.toLowerCase()
                  )
                  .map((exercise, index) => {
                    return (
                      <Col
                        xs={3}
                        key={index}
                        className={
                          index < 2 ||
                          (index > 3 && index < 6) ||
                          (index > 7 && index < 10)
                            ? "slideInLeft"
                            : "slideInRight"
                        }
                      >
                        <ExecrciseCard exercise={exercise} />
                      </Col>
                    );
                  })}
                {!category ||
                  (category.toLowerCase() === "all" && (
                    <Col>
                      <Card
                        className=" m-3 rounded  pointer"
                        style={{ height: "390px", overflowY: "hidden" }}
                        onClick={() =>
                          (window.location.href = `/exercises/${cat}`)
                        }
                      >
                        <img src={cardBackground} alt="..." />
                        <Card.ImgOverlay className="m-0 p-0 d-flex align-items-center justify-content-start ms-3">
                          <h3>View More {cat} Exercises</h3>
                          <FaArrowCircleRight
                            size={30}
                            className="pump pointer ms-3"
                          />
                        </Card.ImgOverlay>
                      </Card>
                    </Col>
                  ))}
              </Row>
            )
          );
        })}
      </Container>
    </>
  );
}

export default Exercises;
