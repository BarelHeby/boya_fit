import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeCard from "./HomeCard";
import "./HomeCard.css";
import { FaUsers, FaDumbbell } from "react-icons/fa";
// import ReviewsScrollBar from "./ReviewsScrollBar";
import HorizontalScroller from "../../components/scroller/HorizontalScroller";
import Rating from "../../models/Rating";
import ReviewScrollItem from "./ReviewScrollItem";
import worker from "./worker.png";
import boyalogo from "../../images/logo/boya-black-logo-transparent.png";
import wallpaper from "./wallpaper.jpg";
import ActiveUsers from "./ActiveUsers";
import { FaMedal } from "react-icons/fa";
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
      description:
        "Discover our diverse community of users, ranging from seasoned male athletes to fitness-conscious females. Everyone finds a place in our inclusive environment.",
      icon: <FaUsers size={25} />,
    },
    {
      to: "/exercises/All",
      label: "Explore Exercises",
      description:
        "Experience our top-notch exercises, meticulously designed to boost your fitness and enhance your strength. Join us for a healthier lifestyle.",
      icon: <FaDumbbell size={25} />,
    },
  ];
  return (
    <Container fluid={"xs"}>
      <Row>
        <img
          src={wallpaper}
          alt="workout"
          height={400}
          style={{ position: "absolute", top: 80, left: 0 }}
          className="fade_bottom "
        />
        <img
          src={worker}
          alt="male"
          style={{ height: 400, width: 350, left: 200, top: 80 }}
          className="position-absolute fade_bottom "
        />
        <div className="topToPlace boyaHeader">
          <img src={boyalogo} alt="boya logo" height={300} />
        </div>
      </Row>
      <div style={{ minHeight: 350 }}></div>
      <Row className="text-center mx-auto m-3 mt-2 w-50">
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
      <hr />
      <Row
        className="mt-2 mb-2"
        style={{ maxWidth: "100%", overflowX: "hidden" }}
      >
        <h2 className="text-center mb-2">Latest Reviews</h2>
        <HorizontalScroller items={ratings} />
      </Row>
      <hr />
      <Row>
        <h2 className="text-center mb-2">Weekly Most Active Users</h2>
        <br />
        <FaMedal size={25} color="gold" />
        <ActiveUsers />
      </Row>
      <div className="mt-2 pt-2 pb-2 bg-dark text-white d-flex align-content-end  ">
        <label className="ms-5">
          &copy; 2024 Boya Fit. All rights reserved.
        </label>
      </div>
    </Container>
  );
}

export default Home;
