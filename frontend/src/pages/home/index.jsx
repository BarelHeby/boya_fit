import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeCard from "./HomeCard";
import "./HomeCard.css";
import { FaUsers, FaDumbbell } from "react-icons/fa";
// import ReviewsScrollBar from "./ReviewsScrollBar";
import HorizontalScroller from "../../components/scroller/HorizontalScroller";
import Rating from "../../models/Rating";
import ReviewScrollItem from "./ReviewScrollItem";
function Home() {
  const [reviews, setReviews] = React.useState([]);
  const ratings = reviews.map((rev, index) => (
    <ReviewScrollItem key={index} rating={rev} />
  ));
  // const ratings = reviews.map((rev, index) => <div>{rev.exerciseName}</div>);
  React.useEffect(() => {
    Rating.get(null).then((ratings) => {
      setReviews(ratings);
    });
  }, []);
  const paths = [
    {
      to: "/users/",
      label: "View Users",
      description: "View All Users",
      icon: <FaUsers size={25} />,
    },
    {
      to: "/exercises/",
      label: "Explore Exercises",
      description: "View Our Latest Exercises",
      icon: <FaDumbbell size={25} />,
    },
  ];
  return (
    <Container fluid={"xs"}>
      <Row>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-an-old-gym-setting-with-dumbbells-image_2569910.jpg"
          alt="workout"
          height={190}
          className="fade_bottom "
        />
        <h1 className="text-center topToPlace  "> Boya Fit</h1>
        <small className="text-center topToPlace">
          Make Yout Life Accurate
        </small>
      </Row>
      <Row className="mt-2">
        <HorizontalScroller items={ratings} />
        {/* <ReviewsScrollBar /> */}
      </Row>
      <Row className="m-3 mt-2">
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
