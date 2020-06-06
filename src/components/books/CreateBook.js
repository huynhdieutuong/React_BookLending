import React, { useContext, useState, useRef } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import BookContext from '../../contexts/book/bookContext';

const CreateBook = ({ setVisible }) => {
  const { createBook } = useContext(BookContext);

  const formRef = useRef('');
  const fileInput = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onFinish = async (values) => {
    let { title, description } = values;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cover', file);

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await createBook(formData);

    setTimeout(hide, 0);
    setVisible(false);
    setDisabled(false);
    formRef.current.resetFields();
  };

  return (
    <Form
      ref={formRef}
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
    >
      <Form.Item
        name='title'
        rules={[{ required: true, message: 'Please input title!' }]}
      >
        <Input placeholder='Please input title' />
      </Form.Item>

      <Form.Item
        name='description'
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input.TextArea placeholder='Please input description' />
      </Form.Item>

      <Form.Item name='cover'>
        <input
          style={{ display: 'none' }}
          type='file'
          ref={fileInput}
          onChange={onChange}
        />
        <Button onClick={() => fileInput.current.click()}>
          <UploadOutlined /> Select cover
        </Button>
        <span>{fileName}</span>
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

export default CreateBook;
