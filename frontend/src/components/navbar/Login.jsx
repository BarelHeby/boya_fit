import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoginModel from "../../models/login";
import User from "../../models/User";
function Login() {
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
      sessionStorage.setItem("username", JSON.stringify(u.toJson()));
      window.location.href = "/";
    } else {
      alert("Login Failed");
    }
  }
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="d-flex">
      <Form.Control
        onChange={(e) => setEmail(e.target.value)}
        className="me-2"
        type="text"
        placeholder="Email"
      />
      <Form.Control
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <Button onClick={onSubmit} className="ms-2" variant="outline-light">
        Login
      </Button>
    </div>
  );
}

export default Login;
