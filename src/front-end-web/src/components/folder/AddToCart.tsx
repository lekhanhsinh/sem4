import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Select, InputNumber } from 'antd';
import updateCart from '../service/UpdateCart';
import deleteImage from '../service/deleteImage';
import { connect } from 'react-redux';
import { setCart } from '../../redux/actions/cart';
const { Option } = Select;

const CollectionCreateForm = Form.create<any>({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add To Cart"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Quantity">
              {getFieldDecorator("quantity", {
                rules: [
                  {
                    required: true,
                    message: "Please input your quantity!"
                  }

                ]
              })(<InputNumber min={1} max={250} />)}
            </Form.Item>
            <Form.Item label="Size" >
              {getFieldDecorator('size', {
                initialValue: '3x4',
              })(
                <Select placeholder="Please select a size">
                  <Option value="3x4">3x4</Option>
                  <Option value="4x6">4x6</Option>
                  <Option value="6x8">6x8</Option>
                  <Option value="10x15">10x15</Option>
                  <Option value="10x20">10x20</Option>
                  <Option value="20x30">20x30</Option>
                  <Option value="50x100">50x100</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Material">
              {getFieldDecorator('material', {
                initialValue: 'PAPER',
              })(
                <Select placeholder="Please select a material" >
                  <Option value="PAPER">PAPER</Option>
                  <Option value="WOOD">WOOD</Option>
                  <Option value="ROCK">ROCK</Option>
                  <Option value="GLASS">GLASS</Option>
                </Select>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class AddToCart extends React.Component<any, any> {
  formRef: any;
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { item, setCart, cart } = this.props;
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: any) => {
      console.log(err);
      if (err) {
        return;
      }
      console.log(cart);

      const temp = [{ ...values, image: item.id, totalPrice: undefined, __typename: undefined }]
      for (const t of temp) {
        for (const i of cart.items) {
          const imageId = i.image.id
          if (i.material === t.material && i.size === t.size && i.image.id === t.image) {
            t.quantity += i.quantity
          } else {
            temp.push({ ...i, image: imageId, totalPrice: undefined, __typename: undefined })
          }
          cart.items.splice(cart.items.indexOf(i), 1);
        }
      }
      console.log(temp);
      updateCart(temp).then(i => {
        console.log(i);
        setCart(i);
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  onDeleteImage = () => {
    const { item, fetchImage } = this.props
    deleteImage(item.id).then(() => {
      fetchImage();
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ marginLeft: 10 }}><Button type="primary" onClick={this.showModal} shape="round" >
          Add Cart
        </Button></span>
        <span><Button type="danger" shape="round" onClick={() => this.onDeleteImage()} >Delete
          </Button></span>
        <div>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          /></div>
      </div>
    );
  }
}

export default connect(
  (state: any) => {
    return {
      cart: state.selfReducer.cart
    }
  }, dispatch => {
    return {
      setCart: (cart: any) => dispatch(setCart(cart))
    }
  })(AddToCart);