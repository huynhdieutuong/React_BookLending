import React, { useContext, useState } from 'react';
import { Button, Popconfirm, message } from 'antd';

import CartContext from '../../contexts/cart/cartContext';

const RemoveBook = ({ bookId, title }) => {
  const { removeBook } = useContext(CartContext);
  const [disabled, setDisabled] = useState(false);

  const confirm = async () => {
    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await removeBook(bookId);

    setDisabled(false);
    setTimeout(hide, 0);
    message.success(`${title} removed`);
  };

  return (
    <Popconfirm
      title='Are you sure remove this book?'
      onConfirm={confirm}
      okText='Yes'
      cancelText='No'
    >
      <Button type='danger' disabled={disabled}>
        Remove
      </Button>
    </Popconfirm>
  );
};

export default RemoveBook;
