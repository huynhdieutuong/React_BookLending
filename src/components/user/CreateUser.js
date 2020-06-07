import React, { useContext, useState, useRef } from 'react';
import { Form, Button, message, Input } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  MobileOutlined,
} from '@ant-design/icons';

import UserContext from '../../contexts/user/userContext';

const CreateUser = ({ setVisible }) => {
  const { createUser } = useContext(UserContext);

  const [disabled, setDisabled] = useState(false);
  const formRef = useRef('');

  const onFinish = async (values) => {
    let { email, name, phone, password, password2 } = values;

    if (password !== password2) return message.error('Wrong Confirm Password');

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    const success = await createUser({ email, name, phone, password });

    setTimeout(hide, 0);
    setDisabled(false);

    if (success) {
      setVisible(false);
      formRef.current.resetFields();
    }
  };

  return (
    <Form
      ref={formRef}
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
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
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input user Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item
        name='password2'
        rules={[{ required: true, message: 'Please input Confirm Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Confirm Password'
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: '0' }}>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          disabled={disabled}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
