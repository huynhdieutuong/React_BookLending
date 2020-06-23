import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import AuthContext from '../../contexts/auth/authContext';

const Login = () => {
  const { login, loginSocial } = useContext(AuthContext);

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await login(email, password);

    setTimeout(hide, 0);
    setDisabled(false);
  };

  useEffect(() => {
    localStorage.setItem('currentMenu', 'login');
  }, []);

  const responseFacebook = (res) => {
    loginSocial('facebook', res.id, res.accessToken);
  };

  const responseGoogle = (res) => {
    loginSocial('google', res.googleId, res.accessToken);
  };

  return (
    <div className='wrapper-form'>
      <Form name='normal_login' className='login-form' onFinish={onFinish}>
        <h2>Login</h2>
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
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            disabled={disabled}
          >
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>

        <Form.Item>
          <FacebookLogin
            appId='3208532689199131'
            autoLoad={false}
            fields='name,email,picture'
            callback={responseFacebook}
            cssClass='ant-btn btn-facebook'
          />
          <GoogleLogin
            clientId='872687324411-kffvug2kkej5e4k4rd0rvc0kqevno8j0.apps.googleusercontent.com'
            className='ant-btn btn-google'
            icon={false}
            buttonText='Login with Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
