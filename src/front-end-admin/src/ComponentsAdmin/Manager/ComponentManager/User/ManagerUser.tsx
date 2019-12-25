import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Modal,
  DatePicker,
  Icon,
  Menu,
  Radio
} from "antd";
import React from "react";
import { ColumnProps } from "antd/es/table";
import { FormComponentProps } from "antd/lib/form";
import "antd/dist/antd.css";
import getUsers from "../../../../Service/GetUsers";
import deleteUser from "../../../../Service/DeleteUser";
import updateUser from "../../../../Service/UpdateUsers";
import moment from "moment";
import { Link } from "react-router-dom";
import getOrdersbyUserId from "../../../../Service/GetOrderSByUserId";
import getOrders from "../../../../Service/GetOrders";
interface Props extends FormComponentProps, ColumnProps<any> {}
const EditableContext = React.createContext("");
const EditableRow = ({ form, index, ...props }: { form: any; index: any }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component<any, any> {
  input: any;
  form: any;
  state = {
    editing: false,
    value: 1
  };
  onChange = (e: any, record: any) => {
    const { handleSave } = this.props;
    record["gender"] = e.target.value;
    handleSave(record);
  };
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e: any) => {
    const { record, handleSave } = this.props;

    this.form.validateFields((error: any, values: any) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form: any) => {
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    this.form = form;
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
    if (title === "Gender") {
      return (
        <div ref={node => (this.input = node)}>
          <Radio.Group
            onChange={e => {
              this.onChange(e, record);
            }}
            value={record["gender"]}
          >
            <Radio value={"MALE"}>Male</Radio>
            <Radio value={"FEMALE"}>Female</Radio>
          </Radio.Group>
        </div>
      );
    }
    if (title === "Id") {
      return (
        <div ref={node => (this.input = node)}>
          <Link to={`/ManagerOrder/${record["id"]}`}>
            <p>{record["id"]}</p>
          </Link>
        </div>
      );
    }
    if (title === "DateOfBirth") {
      return (
        <div ref={node => (this.input = node)}>
          <DatePicker
            value={record["DateOfBirth"]}
            format={dateFormatList}
            onChange={e => {
              record["DateOfBirth"] = e;
              this.props.handleSave(record);
            }}
          />
        </div>
      );
    }
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, width: "100%", height: "30px" }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      id,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
class EditableTableUser extends React.Component<any, any> {
  formRef: any;
  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };
  columns: any[] = [];
  constructor(props: Props) {
    super(props);
    this.columns = [
      {
        title: "Id",
        dataIndex: "id",
        editable: true
      },
      {
        title: "Name",
        dataIndex: "name",
        editable: true
      },
      {
        title: "Email",
        dataIndex: "email"
      },
      {
        title: "Gender",
        dataIndex: "gender",
        editable: true
      },
      {
        title: "Address",
        dataIndex: "address",
        editable: true
      },
      {
        title: "PhoneNumber",
        dataIndex: "phonenumber",
        editable: true
      },
      {
        title: "DateOfBirth",
        dataIndex: "DateOfBirth",
        editable: true
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text: any, record: any) => {
          return this.state.dataSource.length > 0 ? (
            <>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key, record.id)}
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
              <Button type="primary" onClick={this.showModal}>
                Detail
              </Button>
            </>
          ) : null;
        }
      }
    ];
    this.state = {
      visible: false,
      current: "1",
      dataSource: [],
      count: 0,
      indeterminate: true,
      checkAll: false
    };
  }

  componentDidMount() {
    getUsers().then(items => {
      const arr = [];
      for (const str in items) {
        arr.push({
          key: parseInt(str, 10),
          id: items[str].id,
          name: items[str].name,
          email: items[str].email,
          address: items[str].address,
          gender: items[str].gender,
          phonenumber: items[str].phoneNumber,
          DateOfBirth: moment(items[str].dateOfBirth)
        });
      }
      this.setState({
        dataSource: arr,
        count: arr.length
      });
    });
  }
  handleDelete = (key: any, id: string) => {
    deleteUser(id);
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleSave = (row: any) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });

    const user = {
      id: row.id,
      detail: {
        name: row.name,
        address: row.address,
        dateOfBirth: row.DateOfBirth ? row.DateOfBirth.toDate() : null,
        gender: row.gender,
        phoneNumber: row.phonenumber
      }
    };

    updateUser(user.id, user.detail);
    this.setState({ dataSource: newData });
  };
  handleClick = (e: any) => {
    this.setState({
      current: e.key
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e: any) => {
    this.setState({
      visible: false
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { dataSource } = this.state;

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>UserInfo</h1>
        <Modal
          title="Detail"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        ></Modal>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ textAlign: "center" }}
        >
          <Menu.Item key="1">
            <Icon type="user" />
            ManagerUser
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
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTableUser;
