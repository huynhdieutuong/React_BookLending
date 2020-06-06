import React, { useState, useContext } from 'react';
import { Button, message, Popconfirm } from 'antd';

import BookContext from '../../contexts/book/bookContext';

const DeleteBook = ({ id, history }) => {
  const { deleteBook } = useContext(BookContext);
  const [disabled, setDisabled] = useState(false);

  const confirm = async () => {
    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await deleteBook(id, history);

    setDisabled(false);
    setTimeout(hide, 0);
    message.success(`Book ${id} deleted`);
  };

  return (
    <Popconfirm
      title='Are you sure delete this Book?'
      onConfirm={confirm}
      okText='Yes'
      cancelText='No'
    >
      <Button type='danger' disabled={disabled}>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteBook;
