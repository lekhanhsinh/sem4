import React, { FunctionComponent, useState } from "react";
import Form, { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { Input, DatePicker, Radio, Button, notification } from "antd";
import "antd/dist/antd.css";
import {
  isValidNumberForRegion
} from "libphonenumber-js";
import { validatePassword } from "../Validator/ValidatePassword";
import getRegister from "../service/Register";

interface Props extends FormComponentProps, RouteComponentProps { }
const Register: FunctionComponent<Props> = props => {
  enum USER_SEX {
    MALE = "MALE",
    FEMALE = "FEMALE"
  }
  const [gender, setGender] = useState(USER_SEX.MALE)

  const [date, setDate] = useState(null as any);
  const buttonBack = {
    marginLeft: "80px"
  };

  const validateToPhoneNumber = (rule: any, value: any, callback: any) => {
    if (value && !isValidNumberForRegion(value, "VN")) {
      callback("The input is not valid Phone Number");
    }
    callback();
  };
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
      if (!err) {
        const detail = {
          name: values.name,
          gender: gender,
          address: values.address,
          phoneNumber: values.phoneNumber,
          dateOfBirth: date
        }
        getRegister(values.email, values.password, values.repeatPassword, detail)
          .then(register => {
            notification.success({
              message: "Success",
            });
            props.history.push("/login");
          })
          .catch(err => {
            notification.error({
              message: "Fail",
              description: `${err.message}`
            });
          });
      }
    });
  };
  const {
    getFieldDecorator,
    getFieldValue,
    validateFields,
  } = props.form;
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
  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Name :">
        {getFieldDecorator("name", {
          rules: [
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
      <Form.Item label="Date of birth" >
        {getFieldDecorator('date-picker', config)(<DatePicker onChange={value => {
          setDate(value && value.toDate())
        }} />)}
      </Form.Item>

      <Form.Item label="Gender">
        {getFieldDecorator("gender", {
          rules: []
        })(
          <Radio.Group
            value={gender}
            onChange={e => {
              setGender(e.target.value)
            }}>
            <Radio value={USER_SEX.MALE}> Male</Radio>
            <Radio value={USER_SEX.FEMALE}>Female</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="Address">
        {getFieldDecorator("address", {
          rules: [
            {
              max: 50,
              message: "Character number is greater than allowed!"
            }
          ]
        })(<Input style={{ width: "100%" }} />)}
      </Form.Item>
      <Form.Item label="Phone Number">
        {getFieldDecorator("phoneNumber", {
          rules: [
            {
              validator: validateToPhoneNumber
            },
            {
              max: 50,
              message: "Character number is greater than allowed!"
            }
          ]
        })(<Input style={{ width: "100%" }} />)}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
        <Button style={buttonBack}>
          <Link to="/login">{`Back`}</Link>
        </Button>
      </Form.Item>
    </Form>
  );
};
const WrappedFormRegister = Form.create<FormComponentProps>({
  name: "register-form"
})(withRouter(Register));

export default WrappedFormRegister;
