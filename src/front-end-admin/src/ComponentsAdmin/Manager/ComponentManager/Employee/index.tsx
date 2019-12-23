import React, { FunctionComponent } from "react";
import ManagerEmployee from "./ManagerEmployee";
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
        <ManagerEmployee />
      </div>
    </QueueAnim>
  );
};

export default Page;
