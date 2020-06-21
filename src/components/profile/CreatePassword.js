import React, { useContext, useRef, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import AuthContext from '../../contexts/auth/authContext';

const CreatePassword = ({ setVisible }) => {
  const { createPassword } = useContext(AuthContext);

  const formRef = useRef('');
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    const { password, password2 } = values;

    if (password !== password2) return message.error('Wrong Confirm Password');

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    const success = await createPassword({
      password,
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
        password: '',
        password2: '',
      }}
      onFinish={onFinish}
    >
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

export default CreatePassword;
