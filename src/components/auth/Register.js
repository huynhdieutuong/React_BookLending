import React, { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/auth/authContext';

const Register = () => {
  useEffect(() => {
    localStorage.removeItem('formData');
  }, []);

  const { register } = useContext(AuthContext);

  const onFinish = (values) => {
    const { email, name, phone, password, password2 } = values;

    localStorage.setItem('formData', JSON.stringify(values));

    register(email, name, phone, password, password2);
  };

  return (
    <div className='wrapper-form'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={JSON.parse(localStorage.getItem('formData'))}
        onFinish={onFinish}
      >
        <h2>Register</h2>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
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
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item
          name='password2'
          rules={[
            { required: true, message: 'Please input Confirm Password!' },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Confirm Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Register
          </Button>
          Or <Link to='/login'>login now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
