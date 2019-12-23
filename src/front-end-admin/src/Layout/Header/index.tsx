import React, { FunctionComponent, useState } from "react";
import { Layout, Row, Col, Button, Icon, Avatar } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";
const Header = Layout;
const login = localStorage.getItem("userInfo");

const AdminHeader: FunctionComponent<any> = props => {
  const { push } = props.history;
  const [isLogin, setIsLogin] = useState(login);
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLogin("");
    push("/LoginAdmin");
  };
  return (
    <Header className="header">
      <Row type="flex" justify="space-between">
        <Link to="/EditableTable" className="button-blog">
          ADMIN
        </Link>
        {isLogin ? (
          <Col span={4} className="button-block-loggedin">
            <Avatar size="large" icon="user" />
            <Button onClick={handleLogout}>
              <Icon type="logout" />
              {`Log out`}
            </Button>
          </Col>
        ) : (
          <Col span={4} className="button-block">
            <Button>
              <Link to="/LoginAdmin">{`Login`}</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>

  );
};

export default withRouter(AdminHeader);

