import React, { useState, useContext } from 'react';
import { Button, message, Popconfirm } from 'antd';

import UserContext from '../../contexts/user/userContext';

const DeleteUser = ({ id, history }) => {
  const { deleteUser } = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);

  const confirm = async () => {
    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await deleteUser(id, history);

    setDisabled(false);
    setTimeout(hide, 0);
    message.success(`User ${id} deleted`);
  };

  return (
    <Popconfirm
      title='Are you sure delete this user?'
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

export default DeleteUser;
