import React from 'react';
import service1 from '../img/service1.jpg';
import service2 from '../img/service2.jpg';
import service3 from '../img/service3.jpg';
import service4 from '../img/service4.jpg';


class Service extends React.Component {
    render() {
        return (
            <div className="service container">
                <h4>This is a list of materials we supported :</h4>
                <div className="row py-3">
                    <div className="col-md-3 img-animation text-dark">
                        <div>
                            <img src={service1} alt="" />
                        </div>
                        <p>Wood</p>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src={service2} alt="" />
                        </div>
                        <p>Paper</p>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src={service3} alt="" />
                        </div>
                        <p>Stone</p>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src={service4} alt="" />
                        </div>
                        <p>Glass</p>
                    </div>
                </div>
            </div >

        )
    }
}
export default Service;

