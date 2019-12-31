import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Select,
  Icon,
  Menu,
  Modal,
  Row
} from "antd";
import OrderDetails from "./OrderDetails";
import { withRouter } from "react-router-dom";
import React from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import deleteOrder from "../../../../Service/DeleteOrder";
import getOrders from "../../../../Service/GetOrders";
import updateOrder from "../../../../Service/UpdateOrder";
import getOrdersbyUserId from "../../../../Service/GetOrderSByUserId";

export {};
const { Option } = Select;
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
    editing: false
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
    if (title === "Status") {
      return (
        <div>
          {form.getFieldDecorator("status", {
            initialValue: record["status"]
          })(
            <Select
              style={{ width: 120 }}
              onSelect={(value: any) => {
                const c = window.confirm("Are you sure want to change status?");
                if (c) {
                  record.status = value;
                  this.props.handleSave(record);
                } else {
                  this.form.resetFields("status");
                }
              }}
            >
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Done">Done</Option>
              <Option value="Denied">Denied</Option>
            </Select>
          )}
        </div>
      );
    }
    if (title === "UserId") {
      return (
        <div ref={node => (this.input = node)} style={{ width: "100px" }}>
          <Link to={`/ManagerUser/${record["userId"]}`}>
            <p>{record["userId"]}</p>
          </Link>
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
            placeholder="enter something"
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
class EditableTable extends React.Component<any, any> {
  formRef: any;
  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };
  columns: any[] = [];
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      current: "2",
      dataSource: [],
      count: 0,
      indeterminate: true,
      checkAll: false,
      filteredInfo: null,
      sortedInfo: {
        order: "descend"
      }
    };
    let { sortedInfo } = this.state;
  }
  handleClick = (e: any) => {
    this.setState({
      current: e.key
    });
  };
  showModal = (id: string) => {
    this.setState({
      visible: id
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
  handleSort = (a: any, b: any, sorter: any) => {
    this.setState({
      sortedInfo: sorter
    });
  };
  getOrder = () => {
    if (this.props.match.params && this.props.match.params.id) {
      const userId = this.props.match.params.id;
      getOrdersbyUserId(userId).then(orders => {
        const arr = [];
        for (const str in orders) {
          arr.push({
            key: parseInt(str, 10),
            id: orders[str].id,
            userId: orders[str].user.id,
            totalPrice: orders[str].totalPrice,
            address: orders[str].address,
            description: orders[str].description,
            status: orders[str].status,
            items: orders[str].items,
            createdAt: new Date(orders[str].createdAt).toLocaleDateString(
              "en-US"
            ),
            updatedAt: new Date(orders[str].updatedAt).toLocaleDateString(
              "en-US"
            )
          });
        }
        this.setState({
          dataSource: arr,
          count: arr.length
        });
      });
    } else {
      getOrders().then(orders => {
        const arr = [];
        console.log(orders);

        for (const str in orders) {
          arr.push({
            key: parseInt(str, 10),
            id: orders[str].id,
            userId: orders[str].user.id,
            totalPrice: orders[str].totalPrice,
            address: orders[str].address,
            description: orders[str].description,
            status: orders[str].status,
            items: orders[str].items,
            createdAt: new Date(orders[str].createdAt).toLocaleDateString(
              "en-US"
            ),
            updatedAt: new Date(orders[str].updatedAt).toLocaleDateString(
              "en-US"
            )
          });
        }
        this.setState({
          dataSource: arr,
          count: arr.length
        });
      });
    }
  };
  componentDidMount() {
    this.getOrder();
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location.state === this.props.location.state) {
      this.getOrder();
    }
  }
  handleDelete = (key: any, id: string) => {
    deleteOrder(id);
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
        description: row.description,
        address: row.address,
        status: row.status
      }
    };

    updateOrder(user.id, user.detail);
    this.setState({ dataSource: newData });
  };
  render() {
    const { dataSource } = this.state;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    console.log(sortedInfo);
    this.columns = [
      {
        title: "UserId",
        dataIndex: "userId",
        sorter: (a: any, b: any) => a.userId.length - b.userId.length,
        sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order,
        ellipsis: true,
        editable: true
      },
      {
        title: "TotalPrice",
        dataIndex: "totalPrice"
      },
      {
        title: "Address",
        dataIndex: "address",
        editable: true
      },
      {
        title: "Description",
        dataIndex: "description",
        editable: true
      },
      {
        title: "Status",
        dataIndex: "status",
        editable: true
      },
      {
        title: "CreatedAt",
        dataIndex: "createdAt",
        sorter: (a: any, b: any) =>
          ("" + b.createdAt).localeCompare(a.createdAt),
        sortOrder: sortedInfo.columnKey === "createdAt" && sortedInfo.order
      },
      {
        title: "UpdatedAt",
        dataIndex: "updatedAt",
        sorter: (a: any, b: any) =>
          ("" + b.updatedAt).localeCompare(a.updatedAt),
        sortOrder: sortedInfo.columnKey === "updatedAt" && sortedInfo.order
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text: any, record: any) => {
          return this.state.dataSource.length > 0 ? (
            <>
              <Popconfirm
                style={{}}
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key, record.id)}
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
              <Button type="primary" onClick={() => this.showModal(record.id)}>
                Detail
              </Button>
              <Modal
                key={record.key}
                title="Detail"
                visible={this.state.visible === record.id}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <OrderDetails record={record} />
              </Modal>
            </>
          ) : null;
        }
      }
    ];

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
        <h1 style={{ textAlign: "center" }}>OrderInfo</h1>
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
            <Icon type="api" />
            <span>ManagerService</span>
            <Link to="/ManagerService"></Link>
          </Menu.Item>
        </Menu>
        <Table
          onChange={this.handleSort}
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

export default withRouter<any, any>(EditableTable);
