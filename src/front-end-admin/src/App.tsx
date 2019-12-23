import React, { lazy, FunctionComponent, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FallbackLoading from "./FallbackLoading";
const Index = lazy(() => import("./ComponentsAdmin/index"));
const App: FunctionComponent = () => {
  return (
    <BrowserRouter basename="/admin">
      <Suspense fallback={<FallbackLoading />}>
        <Switch>
          <Route path="/" name="Index" component={Index} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
