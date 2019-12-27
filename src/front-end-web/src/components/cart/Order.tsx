import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Select, Input, notification } from 'antd';
import createOrder from '../service/CreateOrder';

const { Option } = Select;



const CollectionCreateForm = Form.create<any>({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                date: null
            }
        }

        render() {
            const { visible, onCancel, onCreate, form, totalPriceAll } = this.props;
            const { getFieldDecorator } = form;




            return (
                <Modal
                    visible={visible}
                    title="Order"
                    okText="Order"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Address :">
                            {getFieldDecorator("address", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Address!"
                                    },
                                    {
                                        max: 255,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Description :">
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your description!"
                                    },
                                    {
                                        max: 255,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        {/* <Form.Item label="Payment :">
                            {getFieldDecorator('payment', {
                                initialValue: 'creditCart',
                            })(
                                <Select placeholder="Please select a material" >
                                    <Option value="creditCart">Credit Cart</Option>
                                    <Option value="cash">Cash</Option>

                                </Select>,
                            )}
                        </Form.Item> */}
                        <div>
                                <p>Total Price : {totalPriceAll}</p>
                            
                        </div>



                    </Form>
                </Modal>
            );
        }
    },
);

class Order extends React.Component<any, any> {
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

    handleCreate = (formRef: any) => {
        const { form } = this.formRef.props;
        form.validateFields((err: any, values: any) => {
            if (err) {
                return;
            }
            const detail ={
                address : values.address,
                description : values.description
            }
            console.log(values);
            createOrder(values.creditCardNumber, detail).then(add => {
                this.setState({visible : false});
                notification.success({
                    message:'Success'
                })
            }).catch(err => {
                notification.error({
                    message : 'Fail'
                })
            })
        });

    };

    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };


    render() {
        return (
            <div style={{
                marginTop : 10
            }}>
                <Button type="primary" onClick={this.showModal}>
                    Check out
                </Button>
                <div>
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        totalPriceAll={this.props.totalPriceAll}
                    /></div>
            </div>
        );
    }
}

export default Order;