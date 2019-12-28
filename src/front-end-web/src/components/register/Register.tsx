import React, { FunctionComponent } from "react";
import { Row, Col } from "antd";
import RegisterForm from "./RegisterForm";
import "./Register.css";

const Register: FunctionComponent = () => {
  return (
    <div>
      <h1 className="title-register">Register</h1>
      <Row type="flex" justify="center" className="form-block">
        <Col sm={22} md={20} lg={12} xl={10}>
          <RegisterForm />
        </Col>
      </Row>
    </div>
  );
};

export default Register;