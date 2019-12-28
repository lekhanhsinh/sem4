import React from 'react';
import content1 from '../img/content1.jpg';
import content2 from '../img/content2.jpg';
import content3 from '../img/content3.jpg';
import content4 from '../img/content4.jpg';
import content5 from '../img/content5.jpg';
import content6 from '../img/content6.jpg';



class Content extends React.Component {
    render() {

        return (
            <div className="container">
                <div className="content-home py-5" >
                    <h3>THE REASON FOR OUR WEBSITE IS A FAMILY PLACE UNDERSTANDED BY CUSTOMERS </h3>
                    <div className="container">
                        <div className="row py-4">
                            <div className="col-md-6">
                                <img src={content1} alt="" />
                                <h5>Exquisite picture color</h5>
                                <p>
                                    Printaphy will surprise you with its incredibly artistic and beautiful picture quality.
                                    Photo prints do not fade and are waterproof.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <img src={content2} alt="" />
                                <h5>No minimum number of printed images specified</h5>
                                <p>
                                    You only need to print small quantities and delivery in a short time.
                                    We do not specify the minimum number of printed images all for customer convenience.
                                </p>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-md-6">
                                <img src={content3} alt="" />
                                <h5>Super-fast delivery nationwide</h5>
                                <p>
                                    We have express delivery service across the country as well.
                                     Whether your application isF small or large, we accept delivery.
                                    You can pay by bank transfer or direct payment (COD) upon receipt of the product.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <img src={content4} alt="" />
                                <h5>Order online</h5>
                                <p>
                                    Gone are you who have to take pictures to the store to wash.
                                     Just a few mouse clicks,
                                     Beautiful photos beautiful photos are ready to be delivered to you.
                                </p>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-md-6">
                                <img src={content5} alt="" />
                                <h5>Customer information is confidential</h5>
                                <p>
                                    Are you looking to print highly personal photos?
                                    We are responsible for protecting the privacy of customer information and photos.
                                    We will not provide customer information to any 3rd party.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <img src={content6} alt="" />
                                <h5>Quick online support</h5>
                                <p>We promise to give you the earliest feedback.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
