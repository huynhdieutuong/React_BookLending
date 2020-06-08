import React, { useState, useContext, useEffect } from 'react';
import { InputNumber, message } from 'antd';

import CartContext from '../../contexts/cart/cartContext';

const ChangeQuantity = ({ quantity, bookId }) => {
  const { changeQuantity, cart } = useContext(CartContext);
  const [number, setNumber] = useState(quantity);

  useEffect(() => {
    setNumber(quantity);
    // eslint-disable-next-line
  }, [cart]);

  const onChange = async (value) => {
    if (isNaN(value) || value <= 0)
      return message.error('Quantity must posity number');

    const hide = message.loading('Action in progress..', 0);

    setNumber(value);
    await changeQuantity(bookId, value);

    setTimeout(hide, 0);
    message.success('Updated quantity');
  };

  return (
    <InputNumber
      min={1}
      style={{ margin: '0 16px' }}
      value={number}
      onChange={onChange}
    />
  );
};

export default ChangeQuantity;
