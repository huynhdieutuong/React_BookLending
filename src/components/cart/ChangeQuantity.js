import React, { useState, useContext, useEffect, useRef } from 'react';
import { InputNumber, message } from 'antd';

import CartContext from '../../contexts/cart/cartContext';

const ChangeQuantity = ({ quantity, bookId }) => {
  const { changeQuantity, cart } = useContext(CartContext);
  const [number, setNumber] = useState(quantity);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setNumber(quantity);
    // eslint-disable-next-line
  }, [cart]);

  const onChange = (value) => {
    if (isNaN(value) || value <= 0)
      return message.error('Quantity must posity number');

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const hide = message.loading('Action in progress..', 0);

      setNumber(value);
      await changeQuantity(bookId, value);

      setTimeout(hide, 0);
      message.success('Updated quantity');
    }, 500);
  };

  return (
    <InputNumber
      ref={typingTimeoutRef}
      min={1}
      style={{ margin: '0 16px' }}
      value={number}
      onChange={onChange}
    />
  );
};

export default ChangeQuantity;
