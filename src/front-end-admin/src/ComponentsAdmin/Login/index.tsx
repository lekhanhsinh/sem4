import React, { FunctionComponent } from "react";
import Login from "./Login";
import QueueAnim from "rc-queue-anim";
const Page: FunctionComponent = () => {
  return (
    <QueueAnim type={["right", "left"]}>
      <div key="0">
        <Login />
      </div>
    </QueueAnim>
  );
};

export default Page;
