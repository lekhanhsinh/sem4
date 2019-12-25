import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Select, Button, Menu, Icon, notification } from "antd";
import { Link } from "react-router-dom";
import setPrice from "../../../../Service/SetPrice";

const { Option } = Select;

class PriceInput extends React.Component<any, any> {
  handleNumberChange = (e: any) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  triggerChange = (changedValue: any) => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={value.number}
          onChange={this.handleNumberChange}
          style={{ width: "auto", marginRight: "3%" }}
        />
      </span>
    );
  }
}
class Method extends React.Component<any, any> {
  handleCurrencyChange = (currency: any) => {
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue: any) => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Select
          value={value.currency}
          size={size}
          style={{ width: "auto" }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="PERCM">PERCM</Option>
          <Option value="PERPIC">PERPIC</Option>
        </Select>
      </span>
    );
  }
}
class Demo extends React.Component<any, any> {
  state = {
    current: "6"
  };
  form: any;

  handleClick = (e: any) => {
    this.setState({
      current: e.key
    });
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values);

        setPrice(values.price.number, values.method.currency)
          .then(() => {
            notification.success({
              message: `SetPrice Successful`
            });
          })
          .catch(err => {
            notification.error({
              message: `SetPrice Fail`
            });
          });
      }
    });
  };

  checkPrice = (rule: any, value: any, callback: any) => {
    if (value.number > 0) {
      return callback();
    }
    callback("Price must greater than zero or must be a number!");
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ textAlign: "center" }}
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span>ManagerUser</span>
            <Link to="/ManagerUser"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="shopping" />
            <span>ManagerOrder</span>
            <Link to="/ManagerOrder"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user-add" />
            <span>RegisterEmployee</span>
            <Link to="/RegisterEmployee"></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="team" />
            <span>ManagerEmployee</span>
            <Link to="/ManagerEmployee"></Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="file-image" />
            <span>ManagerImage</span>
            <Link to="/ManagerImage"></Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="file-image" />
            <span>ManagerService</span>
            <Link to="/ManagerService"></Link>
          </Menu.Item>
        </Menu>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          style={{ textAlign: "center" }}
        >
          <Form.Item label="Method">
            {getFieldDecorator("method", {
              initialValue: { currency: "PERCM" }
            })(<Method />)}
          </Form.Item>
          <Form.Item label="Price">
            {getFieldDecorator("price", {
              initialValue: { number: 0 },
              rules: [{ validator: this.checkPrice }]
            })(<PriceInput />)}
          </Form.Item>
          <br />
          <Form.Item style={{ marginTop: "50px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const WrappedDemo = Form.create({ name: "customized_form_controls" })(Demo);

export default WrappedDemo;
