import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';

import CreateBook from './CreateBook';

const CreateBookModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Button type='primary' onClick={() => setVisible(true)}>
        Create Book
      </Button>
      <Modal
        title='Create Book'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CreateBook setVisible={setVisible} />
      </Modal>
    </Fragment>
  );
};

export default CreateBookModal;
