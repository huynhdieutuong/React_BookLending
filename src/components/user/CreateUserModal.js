import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';

import CreateUser from './CreateUser';

const CreateUserModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Button type='primary' onClick={() => setVisible(true)}>
        Create User
      </Button>
      <Modal
        title='Create User'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CreateUser setVisible={setVisible} />
      </Modal>
    </Fragment>
  );
};

export default CreateUserModal;
