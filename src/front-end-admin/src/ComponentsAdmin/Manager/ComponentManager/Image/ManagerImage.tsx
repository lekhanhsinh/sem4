import { Table, Input, Button, Popconfirm, Form, Icon, Menu } from "antd";
import React from "react";
import { ColumnProps } from "antd/es/table";
import { FormComponentProps } from "antd/lib/form";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import getImages from "../../../../Service/GetImages";
import updateImage from "../../../../Service/UpdateImage";
import deleteImage from "../../../../Service/DeleteImage";
import getImagesbyUserId from "../../../../Service/GetImagesByUserId";
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
    if (title === "Path") {
      return (
        <div ref={node => (this.input = node)}>
          <img
            style={{ width: "80px", height: "80px" }}
            src={`/public/images/${record["path"]}`}
          ></img>
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
      current: "5",
      dataSource: [],
      count: 0,
      indeterminate: true,
      checkAll: false,
      sortedInfo: {
        order: "descend"
      }
    };
  }
  handleSort = (a: any, b: any, sorter: any) => {
    this.setState({
      sortedInfo: sorter
    });
  };
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location.state === this.props.location.state) {
      this.getImage();
    }
  }
  getImage() {
    if (this.props.match.params && this.props.match.params.id) {
      const userId = this.props.match.params.id;
      getImagesbyUserId(userId).then(items => {
        const arr = [];
        for (const str in items) {
          arr.push({
            key: parseInt(str, 10),
            userId: items[str].user.id,
            imageId: items[str].id,
            name: items[str].name,
            path: items[str].path,
            description: items[str].description,
            user: items[str].user.id,
            createdAt: new Date(items[str].createdAt).toLocaleDateString(
              "en-US"
            ),
            updatedAt: new Date(items[str].updatedAt).toLocaleDateString(
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
      getImages().then(items => {
        const arr = [];
        for (const str in items) {
          arr.push({
            key: parseInt(str, 10),
            userId: items[str].user.id,
            imageId: items[str].id,
            name: items[str].name,
            path: items[str].path,
            description: items[str].description,
            user: items[str].user.id,
            createdAt: new Date(items[str].createdAt).toLocaleDateString(
              "en-US"
            ),
            updatedAt: new Date(items[str].updatedAt).toLocaleDateString(
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
  }
  componentDidMount() {
    this.getImage();
  }
  handleDelete = (key: any, id: string) => {
    deleteImage(id);
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
      detail: { name: row.name, description: row.description }
    };

    updateImage(user.id, user.detail);
    this.setState({ dataSource: newData });
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleClick = (e: any) => {
    this.setState({
      current: e.key
    });
  };
  render() {
    const { dataSource } = this.state;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    this.columns = [
      {
        title: "UserId",
        dataIndex: "userId",
        editable: true
      },
      {
        title: "ImageId",
        dataIndex: "imageId",
        editable: false
      },
      {
        title: "Name",
        dataIndex: "name",
        editable: true
      },
      {
        title: "Path",
        dataIndex: "path",
        editable: true
      },
      {
        title: "Description",
        dataIndex: "description",
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
        <h1 style={{ textAlign: "center" }}>ImageInfo</h1>
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

export default withRouter(EditableTable);
