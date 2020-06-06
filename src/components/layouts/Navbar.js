import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
  ScheduleOutlined,
  BookOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import SearchBar from './SearchBar';
import Logo from '../images/logo-bookstore.png';

import AuthContext from '../../contexts/auth/authContext';

const { SubMenu } = Menu;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const [currentMenu, setCurrentMenu] = useState(
    localStorage.getItem('currentMenu')
  );

  const handleClick = (e) => {
    setCurrentMenu(e.key);
    localStorage.setItem('currentMenu', e.key);
    localStorage.removeItem('textSubSearch');
  };

  return (
    <Fragment>
      <Link to='/'>
        <img
          className='logo'
          src={Logo}
          alt='logo'
          onClick={() => {
            setCurrentMenu('books');
            localStorage.setItem('currentMenu', 'books');
          }}
        />
      </Link>
      <SearchBar />
      <Menu
        className='menu-right'
        theme='dark'
        mode='horizontal'
        selectedKeys={currentMenu}
        onClick={handleClick}
      >
        <Menu.Item key='cart' icon={<ShoppingOutlined />}>
          <Link to='#!'>0</Link>
        </Menu.Item>
        {!isAuthenticated ? (
          <Menu.Item key='login' icon={<LoginOutlined />}>
            <Link to='/login'>Login</Link>
          </Menu.Item>
        ) : (
          <SubMenu title={`Hi ${user.name}`}>
            <Menu.Item key='profile' icon={<UserOutlined />}>
              <Link to='/profile'>Profile</Link>
            </Menu.Item>
            {user.isAdmin && (
              <Menu.Item key='adminBooks' icon={<BookOutlined />}>
                <Link to='/books'>Books</Link>
              </Menu.Item>
            )}
            {user.isAdmin && (
              <Menu.Item key='users' icon={<UsergroupAddOutlined />}>
                <Link to='/users'>Users</Link>
              </Menu.Item>
            )}
            <Menu.Item key='transactions' icon={<ScheduleOutlined />}>
              <Link to='/transactions'>Transactions</Link>
            </Menu.Item>
            <Menu.Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </Fragment>
  );
};

export default Navbar;
