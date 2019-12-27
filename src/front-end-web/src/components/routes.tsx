import React from "react";
import Home from './home/Home';
import Contact from './contact/Contact';
import About from './about/About';
import Folder from './folder/Folder';
import NotFound from './notfound/NotFound';
import Login from './login/Login';
import Register from './register/Register';
import User from './user/User';
import Cart from './cart/Cart';


const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/about",
    exact: false,
    main: () => <About />
  },
  {
    path: "/contact",
    exact: false,
    main: () => <Contact />
  },
  {
    path: "/login",
    exact: false,
    main: () => <Login />
  },
  {
    path: "/register",
    exact: false,
    main: () => <Register />
  },
  {
    path: "/folder",
    exact: false,
    main: () => <Folder />,
    checkSelf: true
  },
  {
    path: "/user",
    exact: false,
    main: () => <User />,
    checkSelf: true
  },
  {
    path: "/cart",
    exact: false,
    main: () => <Cart />,
    checkSelf: true
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />
  },

];

export default routes;
