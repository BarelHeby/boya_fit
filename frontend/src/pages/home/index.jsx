import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeCard from "./HomeCard";
import "./HomeCard.css";
function Home() {
  const paths = [
    {
      to: "/users/",
      label: "View Users",
      description: "View All Users",
    },
    {
      to: "/exercises/",
      label: "Explore Exercises",
      description: "View Our Latest Exercises",
    },
  ];
  return (
    <Container fluid={"xs"}>
      <Row>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-an-old-gym-setting-with-dumbbells-image_2569910.jpg"
          alt="workout"
          height={200}
          className="fade_bottom "
        />
        <h1 className="text-center topToPlace  "> Boya Fit</h1>
        <small className="text-center topToPlace">
          Make Yout Life Accurate
        </small>
      </Row>
      <Row className="m-3">
        {paths.map((path, index) => (
          <Col
            xs={6}
            key={index}
            className={
              "mt-2 " + (index % 2 === 0 ? "homeCardLeft" : "homeCardRight")
            }
          >
            <HomeCard path={path} index={index} />
          </Col>
        ))}
      </Row>
      {/* <Row className="bg-dark text-white"> */}
      <div className="p-2 bg-dark text-white d-flex align-content-end justify-items-end ">
        <label>&copy; 2024 Boya Fit. All rights reserved.</label>
      </div>
      {/* </Row> */}
    </Container>
  );
}

export default Home;
