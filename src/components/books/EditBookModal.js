import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';

import EditBook from './EditBook';

const EditBookModal = ({ book, single }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Button type='primary' onClick={() => setVisible(true)}>
        Edit
      </Button>
      <Modal
        title='Edit Book'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <EditBook setVisible={setVisible} book={book} single={single} />
      </Modal>
    </Fragment>
  );
};

export default EditBookModal;
