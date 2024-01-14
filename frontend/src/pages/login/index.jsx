import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import LoginModel from "../../models/login";
import User from "../../models/User";
function LoginComponent({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const l = new LoginModel(email, password);
    const resp = await l.add();
    setLoading(false);
    if (resp.status === 200) {
      const u = User.fromJson(resp.data);
      setUser(u);
      alert("Login Success");
      window.location.href = "/Home";
    } else {
      alert("Login Failed");
    }
  }
  return (
    <Container className="d-flex justify-content-center mx-auto mt-3">
      <Form className="border p-2">
        <h2>Login</h2>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={onSubmit}
          className="mt-2"
        >
          Login
        </Button>
        <br />
        <Form.Text className="text-muted">
          {isLoading ? "Loading..." : ""}
        </Form.Text>
      </Form>
    </Container>
  );
}

export default LoginComponent;
