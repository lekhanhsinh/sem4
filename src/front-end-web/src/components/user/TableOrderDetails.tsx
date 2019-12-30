import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext("");



class TableOrderDetails extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.columns = [
            {
                title: 'img',
                dataIndex: 'img',
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
                title: 'Total Price($)',
                dataIndex: 'totalPrice',
            },
        ];

        this.state = {
            dataSource: [],
            count: 0
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.record.items

        })
    }

    columns: any[] = [];
    render() {

        const { dataSource } = this.state;
        const columns = this.columns.map((col: any) => {
            if (col.title === 'img') {
                return {
                    ...col,
                    render: (text: any, record: any) => {
                        return <img style={{ height: 40, width: 40 }} src={`/public/images/${record.image.path}`} />
                    }
                };
            }
            return col
        });
        return (
            <div>
                <Table
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default TableOrderDetails;
