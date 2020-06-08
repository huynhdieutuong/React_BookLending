import React, { useState, useContext } from 'react';
import { InputNumber } from 'antd';

import CartContext from '../../contexts/cart/cartContext';

const ChangeQuantity = ({ quantity, bookId }) => {
  const { changeQuantity } = useContext(CartContext);
  const [number, setNumber] = useState(quantity);

  return (
    <InputNumber
      min={1}
      max={20}
      style={{ margin: '0 16px' }}
      value={number}
      onChange={(value) => {
        setNumber(value);
        changeQuantity(bookId, value);
      }}
    />
  );
};

export default ChangeQuantity;
