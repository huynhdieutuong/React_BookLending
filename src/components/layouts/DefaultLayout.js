import React, { useContext, useEffect } from 'react';
import { Layout, message } from 'antd';

import Navbar from './Navbar';

import AlertContext from '../../contexts/alert/alertContext';
import AuthContext from '../../contexts/auth/authContext';

const { Header, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
  const { alerts, type, setAlert } = useContext(AlertContext);
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    alerts.length > 0 && alerts.map((alert) => message[type](alert));
    // eslint-disable-next-line
  }, [setAlert]);

  return (
    <Layout className='layout'>
      <Header style={{ padding: '0 50px' }}>
        <Navbar />
      </Header>
      <Content style={{ padding: '30px 50px' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Book Lending ©2020 Created by Tuong Huynh
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
