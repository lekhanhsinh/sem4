import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Order from './Order';
import './Cart.css';
import updateCart from '../service/UpdateCart';
import { setCart } from '../../redux/actions/cart';


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

class Cart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',

      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      },
      {
        title: 'Size',
        dataIndex: 'size',
      },
      {
        title: 'Material',
        dataIndex: 'material',
      },
      {
        title: 'Total Price',
        dataIndex: 'totalPrice',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text: any, record: any) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      count: 0
    };
  }
  componentWillMount(){
    this.initCart(this.props)
  }
  componentWillReceiveProps(nextProps:any){
    this.initCart(nextProps)
  }
  initCart=(nextProps:any) =>{
    const { self, cart } = nextProps
    if (!self || !cart) {
      return
    }
    const { items, totalPrice } = cart;
    const arr = [];
    for (const str in items) {
      arr.push({
        key: parseInt(str, 10),
        name: items[str].image.name,
        quantity: items[str].quantity,
        material: items[str].material,
        size: items[str].size,
        totalPrice: items[str].totalPrice,

      });
    }
    this.setState({
      dataSource: arr,
      count: arr.length,
      totalPriceAll: totalPrice
    });
  }
  handleDelete = (key: any) => {
    const dataSource = [...this.state.dataSource];
    const { self, cart, setCart } = this.props
    if (!self || !cart) {
      return
    }
    const { items, totalPrice } = cart;
    items.splice(key, 1);
    const temp = items.map((value:any) => {
      return ({
        ...value,
        image: value.image.id, totalPrice : undefined, __typename : undefined
      })
    })
    updateCart(temp).then(i=> {
      console.log(i);
      setCart(i)
    })

  };

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
      <div className="container">
        <h1>Cart</h1>
        <div className="cart-div">
          <div>
            <p>TotalPrice : {this.state.totalPriceAll}</p>
          </div>

        </div>

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <div>
          <Order totalPriceAll={this.state.totalPriceAll} />
        </div>
      </div>
    );
  }
}

export default connect((state: any) => {
  return {
    self: state.selfReducer.self,
    cart: state.selfReducer.cart
  }
}, dispatch => {
  return {
      setCart: (cart: any) => dispatch(setCart(cart))
  }
})(withRouter(Cart));
