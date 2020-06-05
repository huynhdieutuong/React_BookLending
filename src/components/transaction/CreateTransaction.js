import React, { useContext, useState } from 'react';
import { Form, Select, Button, message } from 'antd';

import TransactionContext from '../../contexts/transaction/transactionContext';

const { Option } = Select;

const CreateTransaction = ({ setVisible }) => {
  const { createTransaction } = useContext(TransactionContext);

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    const { user, books } = values;

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await createTransaction({ user, books });

    setTimeout(hide, 0);
    setVisible(false);
    setDisabled(false);
  };

  return (
    <Form name='normal_login' className='login-form' onFinish={onFinish}>
      <Form.Item
        name='user'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select an user!',
          },
        ]}
      >
        <Select placeholder='Please select an user'>
          <Option value='china'>China</Option>
          <Option value='usa'>U.S.A</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='books'
        rules={[
          {
            required: true,
            message: 'Please select books',
            type: 'array',
          },
        ]}
      >
        <Select mode='multiple' placeholder='Please select books'>
          <Option value='red'>Red Red Red Red</Option>
          <Option value='green'>Green Green Green Green</Option>
          <Option value='blue'>Blue Blue Blue Blue</Option>
          <Option value='yellow'>Yellow Yellow Yellow Yellow</Option>
          <Option value='white'>White White White White</Option>
          <Option value='black'>Black Black Black Black</Option>
        </Select>
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

export default CreateTransaction;
