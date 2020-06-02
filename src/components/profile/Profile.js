import React, { useContext } from 'react';
import { Row, Col, PageHeader, Tabs, Button, Descriptions } from 'antd';

import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  const { avatarUrl, email, name, phone } = user;

  if (loading) return <Spinner />;

  return (
    <Row>
      <Col span={5}>
        <img style={{ width: '100%' }} src={avatarUrl} alt={name} />
      </Col>
      <Col span={19}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={name}
          extra={[
            <Button key='1' type='primary'>
              Edit Profile
            </Button>,
            <Button key='2' type='primary'>
              Change Password
            </Button>,
          ]}
        >
          <Descriptions size='small' column={3}>
            <Descriptions.Item label='Email'>{email}</Descriptions.Item>
            <Descriptions.Item label='Name'>{name}</Descriptions.Item>
            <Descriptions.Item label='Phone'>{phone}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Col>
    </Row>
  );
};

export default Profile;
