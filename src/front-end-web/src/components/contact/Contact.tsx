import React from 'react';
import Iframe from 'react-iframe';
import './Contact.css';
import contactImg from '../img/contact.jpg';

class Contact extends React.Component {
  render() {
    return (
      <div className="container contact-page">
        <img src={contactImg} />

        <h1>Tell us about your issue so we can help you more quickly.</h1>
        <h2>Other ways to contact us.</h2>

        <div className="row contact-text">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <i className="fas fa-user-alt"></i>
            <p>Ask the community</p>
            <p>+1000 members are online right now.</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <i className="fas fa-headset"></i>
            <p>Resolution Center</p>
            <p>solve any problems and more.</p>

          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <i className="fas fa-envelope"></i>
            <p>Send mail for Us.</p>
            <p>FptUniversity@fpt.edu.vn</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

            <i className="fas fa-phone-square i-wh"></i>
            <p>Call Us</p>
            <p>+84987654312</p>
          </div>
        </div>



        <div>

          <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0951822985944!2d105.77955771440736!3d21.02887719315135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b3260b1a8b%3A0x862052392e3f478e!2zOCBUw7RuIFRo4bqldCBUaHV54bq_dCwgTeG7uSDEkMOsbmgsIFThu6sgTGnDqm0sIEjDoCBO4buZaSAxMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1574857618221!5m2!1svi!2s"
            width="100%" height="400"
            id="myId"
            className="myClassname"
            position="relative" />
        </div>



      </div>
    );
  }
}

export default Contact;