import React, { FunctionComponent } from "react";
import QueueAnim from "rc-queue-anim";
import NotFoundPage from "./NotFoundPage";
const Page: FunctionComponent = () => {
  return (
    <QueueAnim type={["right", "left"]}>
      <div key="0">
        <NotFoundPage />
      </div>
    </QueueAnim>
  );
};

export default Page;
