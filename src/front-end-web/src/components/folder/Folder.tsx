import React from 'react';
import { Button } from 'antd';
import './Folder.css';
import { NavLink, withRouter } from 'react-router-dom';
import deleteImage from '../service/deleteImage';
import AddToCart from './AddToCart';
import getSelfImages from '../service/getSelfImages';
import { connect } from 'react-redux';
import AddImage from './AddImage';




class Folder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      datas: []
    }
  }
  componentDidMount = () => {
    this.fetchImage()
  }

  fetchImage=()=>{
    getSelfImages().then(images => {
      this.setState({
        datas: images
      })
    });
  }


  render() {
    const { self, history } = this.props;

    // if(!self) {
    //   history.push('login')
    // }

    const { datas } = (this.state as any);


    const showImg = datas.map((data: any, index: any) => {
      return <div key={index} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div className="col-folder">
          <img src={`http://herebedragon.com:4000/public/images/${data.path}`} />
          <p className="text-folder">{data.name}</p>
          <AddToCart item={data} fetchImage={this.fetchImage}/>
          
        </div>
      </div>;
    })

    return (
      <div className="container">
        <h1>Your Images</h1>
          <AddImage fetchImage={this.fetchImage}/>

        <div className="row">
          {showImg}
        </div>
      </div >
    );
  }
}

export default connect((state: any) => {
  return {
    self: state.selfReducer.self
  }
})(withRouter(Folder));
