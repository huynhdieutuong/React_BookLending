import React, { useState, useContext } from 'react';
import { Button, message, Popconfirm } from 'antd';

import TransactionContext from '../../contexts/transaction/transactionContext';

const DeleteTransaction = ({ id }) => {
  const { deleteTransaction } = useContext(TransactionContext);
  const [disabled, setDisabled] = useState(false);

  const confirm = async () => {
    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await deleteTransaction(id);

    setDisabled(false);
    setTimeout(hide, 0);
    message.success(`Transaction ${id} deleted`);
  };

  return (
    <Popconfirm
      title='Are you sure delete this transaction?'
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

export default DeleteTransaction;
