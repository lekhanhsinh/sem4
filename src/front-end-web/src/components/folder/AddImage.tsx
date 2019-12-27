import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Select, Input, InputNumber, } from 'antd';
import ImageInput from './ImageInput';
import createImage from '../service/AddImage';


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
            return (
                <Modal
                    visible={visible}
                    title="Add To Cart"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="Name Image:">
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your name!"
                                    },
                                    {
                                        max: 50,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input style={{ width: "100%" }} />)}
                        </Form.Item>
                        <Form.Item label="description">
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your description!"
                                    },
                                    {
                                        max: 50,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input style={{ width: "100%" }} />)}
                        </Form.Item>

                        <Form.Item label="Image">
                            {getFieldDecorator("image", {
                            })(<Input hidden />)}
                            <ImageInput setImage={(image) => {
                                form.setFieldsValue({ "image": image })
                            }} />
                        </Form.Item>


                    </Form>
                </Modal>
            );
        }
    },
);

class AddToImage extends React.Component<any, any> {
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

    handleCreate = (e: any) => {
        e.preventDefault();
        const { fetchImage } = this.props;
        this.formRef.props.form.validateFields((err: any, value: any) => {
            if (!err) {
                const p = {
                    name: value.name,
                    description: value.description,
                    file: value.image
                }
                createImage(p).then(() => {
                    fetchImage();
                    this.setState({
                        visible: false
                    })
                    this.formRef.props.form.resetFields();
                })
            }
        })
    };

    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };



    render() {
        return (
            <div style={{marginBottom:15}}>
                <span>
                    <Button type="primary" onClick={this.showModal} shape="round" >
                        Add Image
                    </Button>
                </span>

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

export default AddToImage;

