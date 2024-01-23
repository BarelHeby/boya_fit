import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ExerciseItemsCard from "./ExerciseItemsCard";
import Rating from "../../models/Rating";
function Reviews({ id }) {
  const [ratings, setRatings] = React.useState([]);
  React.useEffect(() => {
    Rating.get_by_exercise(id)
      .then((r) => {
        if (r.length === 0) {
          return;
        }
        const stars_ratings = [];
        r.forEach((element) => {
          const stars = [];
          for (let i = 0; i < element.rating; i++) {
            stars.push(
              <span key={i} className="me-1 ms-1 fs-3 text-warning">
                &#9733;
              </span>
            );
          }
          stars_ratings.push({ ...element, rating: stars });
        });

        setRatings(stars_ratings);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <Container className="mb-3">
      <Row className=" d-flex justify-content-center">
        {ratings.map((rating, index) => (
          <Col key={index} xs={4} className="mt-3">
            <ExerciseItemsCard
              Content={
                <>
                  <div className="w-100 d-flex justify-content-center">
                    <img
                      alt={""}
                      src={rating?.picture}
                      className="rounded-circle "
                      width={150}
                      height={150}
                    />
                  </div>
                  <br />

                  <Card.Title className="text-center">
                    {rating?.user_name}
                  </Card.Title>
                  <Card.Subtitle className="text-center">
                    {rating?.time.replace("T", " ").substring(0, 16)}
                  </Card.Subtitle>
                  <Card.Text className="text-center mt-2">
                    {rating?.description}
                  </Card.Text>
                  <Card.Text className="text-center mt-0 pt-0">
                    {rating?.rating}
                  </Card.Text>
                </>
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Reviews;
