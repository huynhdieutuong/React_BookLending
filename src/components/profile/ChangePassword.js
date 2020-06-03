import React, { useContext, useRef, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import AuthContext from '../../contexts/auth/authContext';

const ChangePassword = ({ setVisible }) => {
  const { changePassword } = useContext(AuthContext);

  const formRef = useRef('');
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    const { currentPassword, password, password2 } = values;

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    const success = await changePassword({
      currentPassword,
      password,
      password2,
    });

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
      initialValues={{
        currentPassword: '',
        password: '',
        password2: '',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='currentPassword'
        rules={[
          { required: true, message: 'Please input your Current Password!' },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Current Password'
          type='password'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your New Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='New Password'
          type='password'
        />
      </Form.Item>
      <Form.Item
        name='password2'
        rules={[
          { required: true, message: 'Please input your Confirm Password!' },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Confirm Password'
          type='password'
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

export default ChangePassword;
