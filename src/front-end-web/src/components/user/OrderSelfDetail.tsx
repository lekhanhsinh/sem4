import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import OrderDetails from './OrderDeltails';

const EditableContext = React.createContext("");

const EditableRow = ({ form, index, ...props }: { form: any, index: any }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component<any, any> {
  state = {
    editing: false,
  };
  input: any
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };
  form: any
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
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
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

class OrderDetail extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'id',

      },
      {
        title: 'Total Price($)',
        dataIndex: 'totalPrice',

      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text: any, record: any) =>
          this.state.dataSource.length >= 1 ? (
            <OrderDetails record={record}/>
          ) : null,
      }
    ];

    this.state = {
      dataSource: [],
      count: 0
    };
  }
  componentWillMount() {
    this.initOrders(this.props)
  }
  componentWillReceiveProps(nextProps: any) {
    this.initOrders(nextProps)
  }
  initOrders = (nextProps: any) => {
    const { self, orders } = nextProps
    if (!self || !orders) {
      return
    }
    const arr = [];
    for (const str in orders) {
      arr.push({
        key: parseInt(str, 10),
        id: orders[str].id,
        totalPrice: orders[str].totalPrice,
        address: orders[str].address,
        description :orders[str].description,
        items :orders[str].items
      })
    }
    this.setState({
      dataSource: arr,
      count: arr.length
    })
  }


  columns: any[] = [];
  render() {
    const { self, history } = this.props;
    if (!self) {
      history.push('login')
    }
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title
        }),
      };
    });
    return (
      <div>
        <h1>Order Detail</h1>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default connect((state: any) => {
  return {
    self: state.selfReducer.self,
    cart: state.selfReducer.cart,
    orders: state.selfReducer.orders,
  }
})(withRouter(OrderDetail));
