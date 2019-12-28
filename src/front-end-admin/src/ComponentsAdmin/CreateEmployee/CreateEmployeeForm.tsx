import React, { FunctionComponent, useState } from "react";
import Form, { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { Input, Tooltip, Icon, Radio, Button, notification } from "antd";
import "antd/dist/antd.css";
import { validatePassword } from "../../Validator/ValidatePassword";
import getRegister from "../../Service/CreateEmployee";

interface Props extends FormComponentProps, RouteComponentProps {}
const Register: FunctionComponent<Props> = props => {
  const buttonBack = {
    marginLeft: "80px"
  };
  const { push } = props.history;

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value && confirmDirty) {
      validateFields(["repeatPassword"], { force: true });
    }
    callback();
  };
  const validateToPassword = (rule: any, value: any, callback: any) => {
    if (value && !validatePassword(value)) {
      callback(
        "The input is not valid Password! (8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character)"
      );
    }
    callback();
  };
  const handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const detail = {
        name: values.name,
        role: values.role
      };
      if (!err) {
        getRegister(
          values.email,
          values.password,
          values.repeatPassword,
          detail
        )
          .then(register => {
            notification.success({
              message: `Đăng ký thành công`
            });
            push("/LoginAdmin");
          })
          .catch(err => {
            notification.error({
              message: "Đăng ký thất bại",
              description: `${err.message}`
            });
          });
      }
    });
  };
  const { getFieldDecorator, getFieldValue, validateFields } = props.form;
  const formItemLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 24,
        offset: 0
      },
      md: {
        span: 16,
        offset: 8
      }
    }
  };
  const [confirmDirty, setConfirmDirty] = useState(false);
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            },
            {
              max: 50,
              message: "Character number is greater than allowed!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            },
            {
              validator: validateToPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator("repeatPassword", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Name&nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input your name!"
            },
            {
              max: 50,
              message: "Character number is greater than allowed!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
        <Button style={buttonBack}>
          <Link to="/ManagerUser">{`Back`}</Link>
        </Button>
      </Form.Item>
    </Form>
  );
};
const WrappedFormRegister = Form.create<FormComponentProps>({
  name: "register-form"
})(withRouter(Register));

export default WrappedFormRegister;
