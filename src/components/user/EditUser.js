import React, { useContext, useState } from 'react';
import { Form, Button, message, Input } from 'antd';
import { MailOutlined, UserOutlined, MobileOutlined } from '@ant-design/icons';

import UserContext from '../../contexts/user/userContext';

const EditUser = ({ setVisible, single }) => {
  const { editUser, user } = useContext(UserContext);

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    let { email, name, phone } = values;

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    const success = await editUser(user._id, { email, name, phone }, single);

    setTimeout(hide, 0);
    setDisabled(false);

    if (success) {
      setVisible(false);
    }
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
      initialValues={{
        email: user.email,
        name: user.name,
        phone: user.phone,
      }}
    >
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input user Email!' }]}
      >
        <Input
          prefix={<MailOutlined className='site-form-item-icon' />}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input user Name!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
        />
      </Form.Item>
      <Form.Item
        name='phone'
        rules={[{ required: true, message: 'Please input user Phone!' }]}
      >
        <Input
          prefix={<MobileOutlined className='site-form-item-icon' />}
          placeholder='Phone'
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: '0' }}>
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

export default EditUser;
