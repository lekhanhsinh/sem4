import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
class OrderDetails extends React.Component<any, any> {
  columns: any[] = [];
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: [],
      count: 0
    };
    this.columns = [
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size"
      },
      {
        title: "Material",
        dataIndex: "material",
        key: "material"
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (text: any, record: any) => {
          return (
            <div>
              <img
                style={{ width: "80px" }}
                src={`/public/images/${record["image"]}`}
              ></img>
            </div>
          );
        }
      }
      // {
      //   title: "CreatedAt",
      //   dataIndex: "createdAt",
      //   key: "createdAt"
      // },
      // {
      //   title: "UpdatedAt",
      //   dataIndex: "updatedAt",
      //   key: "updatedAt"
      // }
    ];
  }
  componentDidMount() {
    const items = this.props.record.items;
    const arr = [];
    for (const str in items) {
      arr.push({
        quantity: items[str].quantity,
        size: items[str].size,
        material: items[str].material,
        image: items[str].image.path,
        createdAt: new Date(items[str].createdAt).toLocaleDateString("en-US"),
        updatedAt: new Date(items[str].updatedAt).toLocaleDateString("en-US")
      });
    }
    this.setState({
      dataSource: arr,
      count: arr.length
    });
  }

  render() {
    return <Table dataSource={this.state.dataSource} columns={this.columns} />;
  }
}
export default OrderDetails;
