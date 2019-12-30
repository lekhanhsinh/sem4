import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Select, Input, notification, Radio, DatePicker } from 'antd';
import {
    isValidNumberForRegion
} from "libphonenumber-js";
import updateSelfDetail from '../service/UpdateSelfDetail';
import moment from 'moment';



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
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const formatDate = ["DD/MM/YYYY", "DD/MM/YY"];

            const validateToPhoneNumber = (rule: any, value: any, callback: any) => {
                if (value && !isValidNumberForRegion(value, "VN")) {
                    callback("The input is not valid Phone Number");
                }
                callback();
            };
            const config = {
                rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            };

            return (
                <Modal
                    visible={visible}
                    title="Edit infomation"
                    okText="Edit"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name :">
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your E-mail!"
                                    },
                                    {
                                        max: 50,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>


                        <Form.Item label="Date of birth" >
                            {getFieldDecorator('dateOfBirth', config)(<DatePicker
                                format={formatDate}
                            />)}
                        </Form.Item>

                        <Form.Item label="Gender">
                            {getFieldDecorator("gender", {
                                initialValue: 'MALE',
                            })(
                                <Radio.Group
                                >
                                    <Radio value="MALE"> Male</Radio>
                                    <Radio value="FEMALE">Female</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator("address", {
                                rules: [
                                    {
                                        max: 50,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input style={{ width: "100%" }} />)}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator("phoneNumber", {
                                rules: [
                                    {
                                        validator: validateToPhoneNumber
                                    },
                                    {
                                        max: 50,
                                        message: "Character number is greater than allowed!"
                                    }
                                ]
                            })(<Input style={{ width: "100%" }} />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class EditUser extends React.Component<any, any> {
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
        const {fetchSelf} = this.props;
        const { form } = this.formRef.props;
        form.validateFields((err: any, values: any) => {
            if (!err) {
                const detail = {
                    name: values.name,
                    gender: values.gender,
                    address: values.address,
                    phoneNumber: values.phoneNumber,
                    dateOfBirth : values.dateOfBirth.toDate()
                    // dateOfBirth : date
                }
                updateSelfDetail(detail)
                    .then(edit => {
                        fetchSelf().then(()=> {
                            this.setState({ visible: false });
                        notification.success({
                            message: "Success",
                        })
                        })
                        

                    }).catch(err => {
                        notification.error({
                            message: "Fail",
                            description: `${err.message}`
                        });
                    })
            }
        });
    };

    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Edit Info
                </Button>
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

export default EditUser;