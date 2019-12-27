import React from "react";
import { Row, Col } from "antd";
import LoginForm from "./LoginForm";
import "./Login.css";

class Login extends React.Component {
  
  render() {

  return (
      
    <div className="page-login">
      <h1 className="title">Login</h1>
      <Row type="flex" justify="center">
        <Col sm={16} md={10} lg={8} xl={6}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};
}
export default Login;