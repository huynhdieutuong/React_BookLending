import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';

import CreateTransaction from './CreateTransaction';

const CreateTransactionModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Button type='primary' onClick={() => setVisible(true)}>
        Create Transaction
      </Button>
      <Modal
        title='Create Transaction'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CreateTransaction setVisible={setVisible} />
      </Modal>
    </Fragment>
  );
};

export default CreateTransactionModal;
