import React from 'react';
import { Dropdown, Icon } from 'antd';
import menuAccount from './Account';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'About Us',
        to: '/about',
        exact: false
    },
    {
        name: 'Contact Us',
        to: '/contact',
        exact: false
    },

];

class Navbar extends React.Component<any> {
    showMenus = (menus: any) => {
        let result = null;
        if (menus.length > 0) {
            result = menus.map((menu: any, index: any) => {
                return (
                    <NavLink key={index}
                        to={menu.to}
                        exact={menu.exact}
                        activeStyle={{
                            backgroundColor: 'white',
                            color: 'blue',
                            fontWeight: 600
                        }}
                    >
                        <li className="text-right p-3">
                            {menu.name}
                        </li>
                    </NavLink>

                );
            });
        }
        return result;
    }
    render() {
        const { self } = this.props
        return (
            <div className="menu d-flex align-items-center">
                <nav className="navbar navbar-expand-lg container">
                    <ul className="nav navbar-nav">
                        {this.showMenus(menus)}
                    </ul>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {self && <NavLink to="/folder" activeStyle={{
                                backgroundColor: 'white',
                                color: 'blue',
                            }}>
                                <li className="p-3">Folder</li>
                            </NavLink>}
                            {self && <NavLink to="/cart" activeStyle={{
                                backgroundColor: 'white',
                                color: 'blue',
                            }}>
                                <li className="p-3">Cart</li>
                            </NavLink>}

                            {!self && <NavLink to="/login" activeStyle={{
                                backgroundColor: 'white',
                                color: 'blue',
                            }}>
                                <li className="p-3">Sign in</li>
                            </NavLink>}
                            {self && <li className="p-3">
                                <Dropdown overlay={menuAccount}>
                                    <NavLink to="/user">{self.name}
                                        <Icon type="down" /></NavLink>

                                </Dropdown>
                            </li>}
                        </ul>

                    </div>
                </nav>
            </div>




            // <div className="navbar-mg-bt">
            //     {/* navbar */}
            //     <nav className="navbar navbar-inverse" role="navigation">
            //         {/* Collect the nav links, forms, and other content for toggling */}
            //         <div className="collapse navbar-collapse navbar-ex1-collapse">
            //             

            //             <ul className="nav navbar-nav navbar-right mg-right">


            //                 {self && <li><NavLink to="/folder" activeStyle={{
            //                     backgroundColor: 'white',
            //                     color: 'blue',
            //                 }}>Folder</NavLink></li>}
            //                 {self && <li><NavLink to="/cart" activeStyle={{
            //                     backgroundColor: 'white',
            //                     color: 'blue',
            //                 }}>Cart</NavLink></li>}

            //                 {!self && <li><NavLink to="/login" activeStyle={{
            //                     backgroundColor: 'white',
            //                     color: 'blue',
            //                 }}>Sign in</NavLink></li>}
            //                 {self && <li>
            //                     <Dropdown overlay={menuAccount}>
            //                     <NavLink to="/user">{self.name} 
            //                     <Icon type="down" /></NavLink>

            //                     </Dropdown>
            //                 </li>}
            //             </ul>
            //         </div>
            //         {/* navbar-collapse */}
            //     </nav>

            // </div>
        );
    }

}

export default connect((state: any) => {
    return {
        self: state.selfReducer.self
    }
})(Navbar);
