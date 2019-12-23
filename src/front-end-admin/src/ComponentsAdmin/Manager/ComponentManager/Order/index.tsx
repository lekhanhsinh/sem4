import React, { FunctionComponent } from "react";
import ManagerOrder from "./ManagerOrder";
import QueueAnim from "rc-queue-anim";
import Header from "../../../../Layout/Header";
export {};
const Page: FunctionComponent = () => {
  const margin = {
    marginTop: "100px"
  };
  return (
    <QueueAnim type={["right", "left"]}>
      <Header />
      <div key="0" style={margin}>
        <ManagerOrder />
      </div>
    </QueueAnim>
  );
};

export default Page;
