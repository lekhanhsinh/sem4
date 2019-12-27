import React, { FunctionComponent, useState } from "react";
import { Layout, Button, Icon } from "antd";
import { withRouter } from "react-router-dom";
import logout from "../service/Logout";
import { connect } from "react-redux";
import { setSelf } from "../../redux/actions/self";

const login = localStorage.getItem("userInfo");

const AdminHeader: FunctionComponent<any> = props => {
  const { push } = props.history;
  const [isLogin, setIsLogin] = useState(login);
  const handleLogout = () => {
    logout().then(() => {
      props.setSelf(null)
      push('/login')
    })
  };
  return (
    <>
      {isLogin ? (
        <Button onClick={handleLogout}>
          <Icon type="logout" />
          {`Log out`}
        </Button>
      ) : null}
    </>
  );
};

export default connect(null, dispatch => {

  return { setSelf: (self: any) => dispatch(setSelf(self)) }

})(withRouter(AdminHeader));