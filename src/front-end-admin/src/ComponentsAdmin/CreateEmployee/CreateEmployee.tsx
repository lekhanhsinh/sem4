import React, { Component, FunctionComponent } from "react";
import { Row, Col } from "antd";
import CreateEmployeeForm from "./CreateEmployeeForm";
import "./CreateEmployee.css";

const Register: FunctionComponent = () => {
  return (
    <div>
      <h1 className="title">Register</h1>
      <Row type="flex" justify="center" className="form-block">
        <Col sm={22} md={20} lg={12} xl={10}>
          <CreateEmployeeForm />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
