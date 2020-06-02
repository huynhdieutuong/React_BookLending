import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';

import AuthContext from '../../contexts/auth/authContext';

const EditProfile = ({ setVisible }) => {
  const { user, editProfile } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { name, phone } = values;

    const hide = message.loading('Action in progress..', 0);

    await editProfile({ name, phone });

    setTimeout(hide, 0);
    setVisible(false);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        name: user.name,
        phone: user.phone,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
        />
      </Form.Item>
      <Form.Item
        name='phone'
        rules={[{ required: true, message: 'Please input your Phone!' }]}
      >
        <Input
          prefix={<MobileOutlined className='site-form-item-icon' />}
          placeholder='Phone'
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;
