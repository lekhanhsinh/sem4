import React from 'react';
import routes from '../routes';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


class ContentPage extends React.Component<any> {
    showContentMenus = (routes:any) => {
        let result = null;
        if(routes.length > 0) {
            result = routes.map((route : any, index : any) => {
                if(route.checkSelf && !this.props.self){
                    return null;
                }
                return (
                    <Route 
                        key={index}
                        path={route.path} 
                        exact={route.exact}
                        component={route.main} 
                    />
                );
            });
        }
        return result;
    }
    render() {
        return (
            <div className="content-page">
                <Switch>
                { this.showContentMenus(routes) }
                </Switch>
            </div>
        );
    }
}

export default connect((state: any) => {
    return {
      self: state.selfReducer.self,
    }
  })(ContentPage);
