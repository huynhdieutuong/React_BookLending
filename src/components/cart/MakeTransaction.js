import React, { useState, useContext } from 'react';
import { Button, message } from 'antd';
import { withRouter } from 'react-router-dom';

import CartContext from '../../contexts/cart/cartContext';

const MakeTransaction = ({ history }) => {
  const { makeTransaction, cart } = useContext(CartContext);
  const [disabled, setDisabled] = useState(cart.length === 0);

  const onMakeTransaction = async () => {
    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await makeTransaction();

    setDisabled(false);
    setTimeout(hide, 0);
    message.success('Make transaction success');

    history.push('/transactions');
  };

  return (
    <p align='right' style={{ padding: '20px' }}>
      <Button
        type='primary'
        size='large'
        disabled={disabled}
        onClick={onMakeTransaction}
      >
        Make Transaction
      </Button>
    </p>
  );
};

export default withRouter(MakeTransaction);
