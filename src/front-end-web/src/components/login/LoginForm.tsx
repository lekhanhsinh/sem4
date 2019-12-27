import React, { FunctionComponent } from "react";
import { Form, Input, Icon, Button, notification } from "antd";
import { validatePassword } from "../Validator/ValidatePassword";
import "antd/dist/antd.css";
import { FormComponentProps } from "antd/lib/form";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import getLogin from "../service/Login";
import { connect } from "react-redux";
import { setSelf } from "../../redux/actions/self";
const Login: FunctionComponent<any> = props => {
  const {setSelf}= props
  const { getFieldDecorator } = props.form;
  const validateToPassword = (rule: any, value: any, callback: any) => {
    if (value && !validatePassword(value)) {
      callback(
        "The input is not valid Password! (8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character)"
      );
    }
    callback();
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err:any, values:any) => {
      if (!err) {
        getLogin(values.email, values.password)
          .then(login => {
        {
              setSelf(login)
              notification.success({
                message: "Đăng nhập thành công",
                description: `Wellcome ${login.name}`
              });
              props.history.push("/");
            }
          })
          .catch(err => {
            console.log(err);
            
            notification.error({
              message: "Đăng nhập thất bại",
              description: `Something wrong`
            });
          });
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              max: 50,
              message: "Character number is greater than allowed"
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Please input your Password!" },
            {
              validator: validateToPassword
            }
          ]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
        <p className="title">Or <NavLink to="/register">register now!</NavLink></p>
      </Form.Item>
    </Form>
  );
};

const WrappedFormLogin = Form.create<FormComponentProps>({
  name: "login-form"
})(withRouter(Login));

export default connect(null, (dispatch:any) => {
  return {setSelf: (self:any)=> dispatch(setSelf(self))}
})(WrappedFormLogin);
