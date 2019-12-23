import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../Layout";

const Index: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" component={Layout}></Route>
    </Switch>
  );
};

export default Index;
