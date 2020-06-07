import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, PageHeader, Descriptions, Tag, Button, Modal } from 'antd';

import UserContext from '../../contexts/user/userContext';

import Spinner from '../layouts/Spinner';
import NotFound from '../layouts/NotFound';

import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import TableTransactions from '../transaction/TableTransactions';

const SingleUser = ({ match, history }) => {
  const { user, transactions, loading, getUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getUser(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  if (!user) return <NotFound />;

  const { _id, email, name, phone, avatarUrl, wrongLoginCount } = user;

  // Is blocked
  let isBlocked = false;
  if (wrongLoginCount > 3) {
    isBlocked = true;
  }

  return (
    <Row>
      <Col span={8}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={_id}
          extra={[
            <Button type='primary' onClick={() => setVisible(true)}>
              Edit
            </Button>,
            <DeleteUser id={_id} history={history} />,
          ]}
        >
          <Descriptions size='small' column={1}>
            <Descriptions.Item>
              <img style={{ width: '50px' }} src={avatarUrl} alt={name} />
            </Descriptions.Item>
            <Descriptions.Item label='Email'>{email}</Descriptions.Item>
            <Descriptions.Item label='Name'>{name}</Descriptions.Item>
            <Descriptions.Item label='Phone'>{phone}</Descriptions.Item>
            <Descriptions.Item label='Status'>
              {' '}
              <Tag color={isBlocked ? 'volcano' : 'green'}>
                {isBlocked ? 'Blocked' : 'Active'}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Col>
      <Col span={16}>
        <TableTransactions dataSource={transactions} />
      </Col>
      <Modal
        title='Edit User'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <EditUser setVisible={setVisible} single={true} />
      </Modal>
    </Row>
  );
};

export default SingleUser;
