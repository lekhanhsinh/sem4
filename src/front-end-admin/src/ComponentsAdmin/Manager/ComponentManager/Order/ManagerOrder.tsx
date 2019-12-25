import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Select,
  Icon,
  Menu
} from "antd";
import { withRouter } from "react-router-dom";
import React from "react";
import { ColumnProps } from "antd/es/table";
import { FormComponentProps } from "antd/lib/form";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import deleteOrder from "../../../../Service/DeleteOrder";
import getOders from "../../../../Service/GetOrders";
import updateOrder from "../../../../Service/UpdateOrder";
import getOrdersbyUserId from "../../../../Service/GetOrderSByUserId";
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
  constructor(props: Props) {
    super(props);
    this.columns = [
      {
        title: "Image",
        dataIndex: "image"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        editable: true
      },
      {
        title: "Size",
        dataIndex: "size",
        editable: true
      },
      {
        title: "TotalPirce",
        dataIndex: "totalPrice"
      },
      {
        title: "Material",
        dataIndex: "material"
      },
      {
        title: "Status",
        dataIndex: "status"
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
            </>
          ) : null;
        }
      }
    ];
    this.state = {
      current: "2",
      dataSource: [],
      count: 0,
      indeterminate: true,
      checkAll: false
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    if (userId) {
      getOrdersbyUserId(userId).then(items => {
        const arr = [];

        for (const str in items) {
          arr.push({
            key: parseInt(str, 10),
            image: items[str].items[0].image.path,
            quantity: items[str].items[0].quantity,
            size: items[str].items[0].size,
            totalPrice: items[str].items[0].totalPrice,
            status: items[str].items[0].status,
            material: items[str].items[0].material
          });
        }
        this.setState({
          dataSource: arr,
          count: arr.length
        });
      });
    } else {
      getOders().then(items => {
        const arr = [];

        for (const str in items) {
          arr.push({
            key: parseInt(str, 10),
            image: items[str].items[0].image.path,
            quantity: items[str].items[0].quantity,
            size: items[str].items[0].size,
            totalPrice: items[str].items[0].totalPrice,
            status: items[str].items[0].status,
            material: items[str].items[0].material
          });
        }
        this.setState({
          dataSource: arr,
          count: arr.length
        });
      });
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
      detail: { name: row.name, address: row.address }
    };

    updateOrder(user.id, user.detail);
    this.setState({ dataSource: newData });
  };
  handleClick = (e: any) => {
    console.log("click ", e);
    this.setState({
      current: e.key
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

export default withRouter<any, any>(EditableTable);
