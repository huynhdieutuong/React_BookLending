import React, { useContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';

import AuthContext from '../../contexts/auth/authContext';

const EditProfile = ({ setVisible }) => {
  const { user, editProfile } = useContext(AuthContext);

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    const { name, phone } = values;

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await editProfile({ name, phone });

    setTimeout(hide, 0);
    setVisible(false);
    setDisabled(false);
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
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          disabled={disabled}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;
