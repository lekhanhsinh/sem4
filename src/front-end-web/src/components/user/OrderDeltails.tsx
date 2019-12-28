import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form } from 'antd';
import TableOrderDetails from './TableOrderDetails';



const CollectionCreateForm = Form.create<any>({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
        }

        render() {
            const { visible, onCancel, record } = this.props;


            return (
                <Modal
                    visible={visible}
                    title="Details"
                    onCancel={onCancel}
                    footer={null}
                >
                    <TableOrderDetails record={record} />
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



    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Detail
                </Button>
                <div>
                    <CollectionCreateForm
                        record={this.props.record}
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                    /></div>
            </div>
        );
    }
}

export default EditPass;