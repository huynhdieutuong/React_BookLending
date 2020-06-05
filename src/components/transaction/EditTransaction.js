import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Select, Button, message } from 'antd';

import Spinner from '../layouts/Spinner';

import TransactionContext from '../../contexts/transaction/transactionContext';

const { Option } = Select;

const EditTransaction = ({ setVisible }) => {
  const { editTransaction, loadAdminDatas, adminDatas } = useContext(
    TransactionContext
  );

  const [disabled, setDisabled] = useState(false);
  const formRef = useRef('');

  const onFinish = async (values) => {
    let { user, books } = values;
    books = books.map((book) => book.slice(0, 24));

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await editTransaction({ user, books });

    setTimeout(hide, 0);
    setVisible(false);
    setDisabled(false);
    formRef.current.resetFields();
  };

  useEffect(() => {
    loadAdminDatas();
    // eslint-disable-next-line
  }, [adminDatas]);

  if (!adminDatas) return <Spinner />;

  return (
    <Form
      ref={formRef}
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
    >
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
          {adminDatas.users.map((user) => (
            <Option
              key={user._id}
              value={user._id}
            >{`${user._id} - ${user.name}`}</Option>
          ))}
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
          {adminDatas.books.map((book) => (
            <Option key={book._id} value={`${book._id} - ${book.title}`}>
              {book.title}
            </Option>
          ))}
        </Select>
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

export default EditTransaction;
