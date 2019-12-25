import React, { FunctionComponent } from "react";
import { Form, Input, Icon, Button, notification } from "antd";
import { validatePassword } from "../../Validator/ValidatePassword";
import "antd/dist/antd.css";
import { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps, withRouter } from "react-router-dom";
import getLogin from "../../Service/Login";
import getUsers from "../../Service/GetUsers";
interface Props extends FormComponentProps, RouteComponentProps {}

const Login: FunctionComponent<Props> = props => {
  const { push } = props.history;
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
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        getLogin(values.email, values.password)
          .then(loginEmployee => {
            if (loginEmployee) {
              notification.success({
                message: `Login Successfull`,
                description: `Wellcome ${loginEmployee.name}`
              });
              push("/ManagerUser");
            } else {
              notification.error({
                message: "Login Fail",
                description: `Something wrong`
              });
            }
          })
          .catch(err => {
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
            prefix={<Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />}
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
      </Form.Item>
    </Form>
  );
};

const WrappedFormLogin = Form.create<FormComponentProps>({
  name: "login-form"
})(withRouter(Login));

export default WrappedFormLogin;
