import React, { useState } from "react";
import User from "../../models/User";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const text_props = [name, email, password];
    for (let i = 0; i < text_props.length; i++) {
      if (text_props[i] === "") {
        alert("Please fill in all fields");
        return;
      }
    }
    if (fitnessLevel < 1 || fitnessLevel > 5) {
      alert("Please enter a valid fitness level(1-5)");
      return;
    }

    if (weight < 1) {
      alert("Please enter a valid weight");
      return;
    }
    if (height < 1) {
      alert("Please enter a valid height");
      return;
    }
    setLoading(true);
    const u = new User(
      456,
      name,
      email,
      password,
      fitnessLevel,
      weight,
      height,
      null
    );
    const resp = await u.add();
    if (resp.status === 200) {
      alert("User added successfully");
      window.location.href = "/";
    } else {
      alert(
        "User not added successfully. Username or email already exists. Please try again."
      );
    }
    setLoading(false);
  };

  const prop = [
    {
      label: "Name",
      type: "text",
      onChange: (e) => setName(e.target.value),
    },
    {
      label: "Email",
      type: "email",
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      onChange: (e) => setPassword(e.target.value),
    },
    {
      label: "Fitness Level",
      type: "text",
      onChange: (e) => setFitnessLevel(e.target.value),
    },
    {
      label: "Weight",
      type: "number",
      onChange: (e) => setWeight(e.target.value),
    },
    {
      label: "Height",
      type: "number",
      onChange: (e) => setHeight(e.target.value),
    },
  ];
  return (
    <Container className="mt-3">
      <h2 className="text-center ">Register</h2>
      <div className="align-items-center">
        {prop.map((p, i) => (
          <Row
            key={i}
            className=" d-flex justify-content-start mt-3  align-items-center w-50 mx-auto "
          >
            <Col>
              <label className="fw-bold">{p.label}</label>
            </Col>
            <Col>
              <input type={p.type} onChange={p.onChange} />
            </Col>
          </Row>
        ))}
        <Row className="w-50 mx-auto ">
          <Button onClick={() => handleSubmit()} className="mt-3 ">
            Submit
          </Button>
        </Row>
        <Row className="w-50 mx-auto mt-3 ">
          <label className="fs-5 ">{loading ? "loading..." : ""}</label>
        </Row>
      </div>
    </Container>
  );
}
