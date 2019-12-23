import React, { FunctionComponent } from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../route/route";
import Header from "./Header";
const { Content, Footer } = Layout;

const Home: FunctionComponent = () => {
  return (
    <div key="0">
      <Layout>
        <Content>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                component={route.component}
                path={route.path}
              ></Route>
            ))}
            <Route
              exact
              path="/"
              render={() => <Redirect to="/LoginAdmin" />}
            />
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </div>
  );
};

export default Home;
