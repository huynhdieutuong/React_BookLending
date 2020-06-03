import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'antd';

import ChangePassword from './ChangePassword';

const ChangePasswordModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <Button type='primary' onClick={() => setVisible(true)}>
        Change Password
      </Button>
      <Modal
        title='Change Password'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <ChangePassword setVisible={setVisible} />
      </Modal>
    </Fragment>
  );
};

export default ChangePasswordModal;
