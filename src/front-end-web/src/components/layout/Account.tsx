import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const menu = (
  <Menu>
    <Menu.Item>
      <Logout />
    </Menu.Item>
  </Menu>
);

export default menu;