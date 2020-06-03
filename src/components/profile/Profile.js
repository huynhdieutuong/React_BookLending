import React, { useContext } from 'react';
import { Row, Col, PageHeader, Descriptions } from 'antd';

import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import ChangeAvatar from './ChangeAvatar';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';

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
          extra={[<EditProfileModal />, <ChangePasswordModal />]}
        >
          <Descriptions size='small' column={1}>
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
