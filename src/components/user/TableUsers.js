import React, { useContext, useState, Fragment } from 'react';
import { Table, Tag, Row, Col, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

import UserContext from '../../contexts/user/userContext';

const TableUsers = ({ dataSource, isAdmin }) => {
  const [visible, setVisible] = useState(false);
  const { setUser } = useContext(UserContext);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      key: 'wrongLoginCount',
      dataIndex: 'wrongLoginCount',
      render: (wrongLoginCount) => {
        let isBlocked = false;
        if (wrongLoginCount > 3) {
          isBlocked = true;
        }

        return (
          <>
            {
              <Tag color={isBlocked ? 'volcano' : 'green'}>
                {isBlocked ? 'Blocked' : 'Active'}
              </Tag>
            }
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (user) => (
        <Row size='middle'>
          <Col flex='30%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <Button type='primary'>
              <Link to={`/users/${user._id}`}>View</Link>
            </Button>
          </Col>
          <Col flex='30%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <Button
              type='primary'
              onClick={() => {
                setUser(user);
                setVisible(true);
              }}
            >
              Edit
            </Button>
          </Col>
          <Col flex='30%'>
            <DeleteUser id={user._id} />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Fragment>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      {visible && (
        <Modal
          title='Edit User'
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <EditUser setVisible={setVisible} />
        </Modal>
      )}
    </Fragment>
  );
};

export default TableUsers;
