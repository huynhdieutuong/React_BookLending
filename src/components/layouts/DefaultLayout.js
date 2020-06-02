import React, { useContext } from 'react';
import { Layout, message } from 'antd';

import Navbar from './Navbar';

import AlertContext from '../../contexts/alert/alertContext';

const { Header, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
  const { alerts, type } = useContext(AlertContext);

  return (
    <Layout className='layout'>
      <Header style={{ padding: '0 50px' }}>
        <Navbar />
      </Header>
      <Content style={{ padding: '30px 50px' }}>
        {alerts.length > 0 && alerts.map((alert) => message[type](alert))}
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Book Lending ©2020 Created by Tuong Huynh
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
