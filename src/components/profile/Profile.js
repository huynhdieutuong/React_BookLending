import React, { useContext } from 'react';
import { Row, Col, PageHeader, Button, Descriptions } from 'antd';

import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import ChangeAvatar from './ChangeAvatar';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  const { email, name, phone } = user;

  if (loading) return <Spinner />;

  return (
    <Row>
      <Col span={5}>
        <ChangeAvatar />
      </Col>
      <Col span={19}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={name}
          extra={[
            <EditProfileModal />,
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
