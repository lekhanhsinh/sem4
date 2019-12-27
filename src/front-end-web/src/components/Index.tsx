import React from 'react';
import './Index.css';
import { Layout } from 'antd';
import Navbar from './layout/Navbar';
import ContentPage from './layout/ContentPage';
import FooterPage from './layout/FooterPage';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSelf } from '../redux/actions/self';
import getSelf from './service/GetSelf';
import { setCart } from '../redux/actions/cart';
import getCart from './service/GetCart';


class Index extends React.Component<any> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        const {history}=this.props
        getSelf().then(self => {
            this.props.setSelf(self)
            getCart().then(cart => {
                if(cart){
                    this.props.setCart(cart)
                }
            })
        })
    }

    render() {
        return (
            <div >
                    <Layout>
                        <Navbar />
                        <ContentPage />
                        <FooterPage />
                    </Layout>
            </div>
        );
    }
}

export default connect(null, dispatch => {
    return {
        setSelf: (self: any) => dispatch(setSelf(self)),
        setCart: (cart: any) => dispatch(setCart(cart))
    }
})(withRouter(Index));
 