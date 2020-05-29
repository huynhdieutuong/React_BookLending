import React from 'react';
import { Layout } from 'antd';

import Navbar from './Navbar';

const { Header, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
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
