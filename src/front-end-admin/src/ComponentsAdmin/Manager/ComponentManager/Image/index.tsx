import React, { FunctionComponent } from "react";
import ManagerImage from "./ManagerImage";
import QueueAnim from "rc-queue-anim";
import Header from "../../../../Layout/Header";
const Page: FunctionComponent = () => {
  const margin = {
    marginTop: "100px"
  };
  return (
    <QueueAnim type={["right", "left"]}>
      <Header />
      <div key="0" style={margin}>
        <ManagerImage />
      </div>
    </QueueAnim>
  );
};

export default Page;
