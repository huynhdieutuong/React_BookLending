import React, { useContext, useState } from 'react';
import { Form, Button, message, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import UserContext from '../../contexts/user/userContext';

const ChangePasswordUser = ({ setVisible }) => {
  const { changePasswordUser, user } = useContext(UserContext);

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    let { password, password2 } = values;

    if (password !== password2) return message.error('Wrong Confirm Password');

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    const msg = await changePasswordUser(user._id, { password });

    setTimeout(hide, 0);
    setDisabled(false);
    setVisible(false);
    message.success(msg);
  };

  return (
    <Form name='normal_login' className='login-form' onFinish={onFinish}>
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordUser;
