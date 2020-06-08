import React, { useEffect, useContext } from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';

import UserContext from '../../contexts/user/userContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import Pagination from '../layouts/Pagination';
import TableUsers from './TableUsers';
import CreateUserModal from './CreateUserModal';
import SubSearchBar from '../layouts/SubSearchBar';

const Users = () => {
  const { users, pagination, loading, getUsers } = useContext(UserContext);

  const { user } = useContext(AuthContext);

  const textSubSearch = localStorage.getItem('textSubSearch') || '';

  useEffect(() => {
    getUsers(textSubSearch);
    localStorage.setItem('currentMenu', 'users');
    // eslint-disable-next-line
  }, []);

  if (!user.isAdmin) return <Redirect to='/' />;

  return (
    <Row>
      <Col span={24}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title='Users'
          extra={[
            <SubSearchBar
              placeholder='Type Email or Name'
              getData={getUsers}
            />,
            user.isAdmin && <CreateUserModal />,
            <Pagination
              pagination={pagination}
              getData={getUsers}
              textSearch={textSubSearch}
            />,
          ]}
        >
          {loading ? <Spinner /> : <TableUsers dataSource={users} />}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default Users;
