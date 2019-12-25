import React, { FunctionComponent } from "react";
import ManagerService from "./ManagerService";
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
        <ManagerService />
      </div>
    </QueueAnim>
  );
};

export default Page;
