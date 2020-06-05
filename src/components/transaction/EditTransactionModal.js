import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';

import EditTransaction from './EditTransaction';

const EditTransactionModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Button type='primary' onClick={() => setVisible(true)}>
        Edit
      </Button>
      <Modal
        title='Edit Transaction'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <EditTransaction setVisible={setVisible} />
      </Modal>
    </Fragment>
  );
};

export default EditTransactionModal;
