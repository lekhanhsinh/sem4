import React from 'react';
import service1 from '../img/service1.jpg';
import service2 from '../img/service2.jpg';
import service3 from '../img/service3.jpg';
import service4 from '../img/service4.jpg';


class Service extends React.Component {
    render() {
        return (
            <div className="service container">
                <h4>Dưới đây là 1 số loại chất liệu in của chúng tôi</h4>
                <div className="row py-3">
                    <div className="col-md-3 img-animation text-dark">
                        <div>
                            <img src={service1} alt="" />
                        </div>
                        <p>Gỗ</p>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src={service2} alt="" />
                        </div>
                        <p>Giấy</p>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src={service3} alt="" />
                        </div>
                        <p>đá</p>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src={service4} alt="" />
                        </div>
                        <p>THủy tinh</p>
                    </div>
                </div>
                {/* <div className="row py-3">
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src="https://steamuserimages-a.akamaihd.net/ugc/595914029953794097/4067781A4C2B92FF9B355CF644E7025783E3AF8A/"
                                alt="" />
                        </div>
                    </div>

                    <div className="col-md-3 img-animation">
                        <div>
                            <img src="https://www.bestfunforall.com/better/imgs/Fresh%20Meat%20Dota%202%20Pudge%20Artwork%20wallpaper%20%206.png"
                                alt="" />
                        </div>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src="https://media.karousell.com/media/photos/products/2017/04/11/pudgemedusajuggernaut_dota_2_set_clearance_1491908988_6f74bad5.PNG"
                                alt="" />
                        </div>
                    </div>
                    <div className="col-md-3 img-animation">
                        <div>
                            <img src="https://cdna.artstation.com/p/assets/images/images/020/603/208/large/aldrin-de-guzman-tinker-perspective.jpg?1568424856"
                                alt="" />
                        </div>
                    </div>
                </div> */}
            </div >

        )
    }
}
export default Service;

