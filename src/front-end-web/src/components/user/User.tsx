import React from 'react';
import { withRouter } from 'react-router-dom';
import './User.css';
import getUser from '../service/GetSelf';
import { connect } from 'react-redux';
import EditPass from './EditPass';
import EditUser from './EditUser';
import OrderDetail from './OrderDetail';


class User extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null
    }
  }
  componentWillMount = () => {
    this.fetchSelf()
  }

  fetchSelf = () => {
    return getUser().then(info => {
      this.setState({
        data: info
      })
    });
  }
  render() {
    const { self, history } = this.props;
    // const convertToDate = (id: any, newDate: any) => {
    //   const date = new Date(id)
    //   newDate = `${date.getDate} - ${date.getMonth} - ${date.getFullYear}`
    //   return newDate
    // }

    if (!self) {
      history.push('login')
    }
    const { data } = (this.state as any);

    return (
      <div className="container user-page">

        {data && (
          <div>
            <h1>INFOMATION USER</h1>
            <div>
              <div className="user-div ">
                <EditPass />
                <EditUser fetchSelf={this.fetchSelf} />
              </div>
              <div>
                <div className="user-div">
                  <div className="witdh-div">
                    <p>Name : {data.name}</p>
                  </div>
                  <div className="witdh-div">
                    <p>Email : {data.email}</p>
                  </div>
                </div>
                <div className="user-div">
                  <div className="witdh-div">
                    <p>Date of birth : {data.dateOfBirth}</p>
                  </div>
                  <div className="witdh-div">
                    <p>Gender : {data.gender}</p>
                  </div>
                </div>
                <div className="user-div">
                  <div className="witdh-div">
                    <p>Address : {data.address}</p>
                  </div>
                  <div className="witdh-div">
                    <p>Phone Number : {data.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <OrderDetail />
      </div>
    );
  }
}

export default connect((state: any) => {
  return {
    self: state.selfReducer.self
  }
})(withRouter(User));