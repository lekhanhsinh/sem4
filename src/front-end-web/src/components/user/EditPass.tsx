import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Select, Input, notification, } from 'antd';
import { validatePassword } from "../Validator/ValidatePassword";
import updateSelfPassword from '../service/UpdateSelfPassword';



const CollectionCreateForm = Form.create<any>({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
        }

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator, getFieldValue, validateFields, confirmDirty } = form;
            const compareToFirstPassword = (rule: any, value: any, callback: any) => {
                if (value && value !== getFieldValue("newPassword")) {
                    callback("Two passwords that you enter is inconsistent!");
                } else {
                    callback();
                }
            };
            const validateToNextPassword = (rule: any, value: any, callback: any) => {
                if (value && confirmDirty) {
                    validateFields(["repeatPassword"], { force: true });
                }
                callback();
            };
            const validateToPassword = (rule: any, value: any, callback: any) => {
                if (value && !validatePassword(value)) {
                    callback(
                        "The input is not valid Password! (8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character)"
                    );
                }
                callback();
            };
            
            return (
                <Modal
                    visible={visible}
                    title="Edit password"
                    okText="Edit"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    },
                                    {
                                        validator: validateToNextPassword
                                    },
                                    {
                                        validator: validateToPassword
                                    }
                                ]
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="New Password" hasFeedback>
                            {getFieldDecorator("newPassword", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    },
                                    {
                                        validator: validateToNextPassword
                                    },
                                    {
                                        validator: validateToPassword
                                    }
                                ]
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="Confirm New Password" hasFeedback>
                            {getFieldDecorator("repeatPassword", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please confirm your password!"
                                    },
                                    {
                                        validator: compareToFirstPassword
                                    }
                                ]
                            })(<Input.Password />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class EditPass extends React.Component<any, any> {
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
            updateSelfPassword(values.password, values.newPassword, values.repeatPassword)
            .then(editpass => {
                this.setState({ visible: false });
                notification.success({
                    message: "Success",
                })
            }).catch(err => {
                notification.error({
                    message: "Fail",
                    description: `${err.message}`
                  });
            })

        });
    };

    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{marginRight : 20}} >
                    Edit Password
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

export default EditPass;