import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../Image/404.png";
import { url } from "inspector";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <p style={{ textAlign: "center" }}>
          <img src={require("../Image/404.png")} />
        </p>
      </div>
    );
  }
}
export default NotFoundPage;
