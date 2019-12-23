import React, { FunctionComponent } from "react";
import Register from "./CreateEmployee";
import QueueAnim from "rc-queue-anim";
const Page: FunctionComponent = () => {
  return (
    <QueueAnim type={["right", "left"]}>
      <div key="0">
        <Register />
      </div>
    </QueueAnim>
  );
};

export default Page;
