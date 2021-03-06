import React, { useContext, useState, useRef } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import BookContext from '../../contexts/book/bookContext';

const EditBook = ({ setVisible, single }) => {
  const { editBook, book } = useContext(BookContext);

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
    await editBook(book, formData, single);

    setTimeout(hide, 0);
    setVisible(false);
    setDisabled(false);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
      initialValues={{
        title: book.title,
        description: book.description,
      }}
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
        <Input.TextArea rows={8} placeholder='Please input description' />
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBook;
