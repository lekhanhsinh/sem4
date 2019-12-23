import React, { Component, FunctionComponent } from "react";
import { Row, Col } from "antd";
import LoginForm from "./LoginForm";
import "./Login.css";

const Login: FunctionComponent = () => {
  return (
    <div>
      <h1 className="title">Login</h1>
      <Row type="flex" justify="center">
        <Col sm={16} md={10} lg={8} xl={6}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};
export default Login;
