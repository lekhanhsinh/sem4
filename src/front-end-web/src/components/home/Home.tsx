import React from 'react';
import './Home.css';
import Slideshow from './Slideshow';
import Header from './Header';
import Service from './Service';
import Content from './Content';
import FooterHome from './FooterHome';



class Home extends React.Component {
    render() {

        return (
            <div >
                <Slideshow />
                <Header />
                <Service />
                <Content />
                <FooterHome />
            </div>
        );
    }
}

export default Home;
