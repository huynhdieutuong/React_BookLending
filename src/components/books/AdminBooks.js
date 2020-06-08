import React, { useEffect, useContext } from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';

import BookContext from '../../contexts/book/bookContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import Pagination from '../layouts/Pagination';
import TableBooks from './TableBooks';
import CreateBookModal from './CreateBookModal';
import SubSearchBar from '../layouts/SubSearchBar';

const AdminBooks = () => {
  const { books, pagination, loading, getBooks } = useContext(BookContext);

  const { user } = useContext(AuthContext);

  const textSubSearch = localStorage.getItem('textSubSearch') || '';

  useEffect(() => {
    getBooks(textSubSearch);
    localStorage.setItem('currentMenu', 'adminBooks');
    // eslint-disable-next-line
  }, []);

  if (!user.isAdmin) return <Redirect to='/' />;

  return (
    <Row>
      <Col span={24}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title='Books'
          extra={[
            <SubSearchBar placeholder="Type Book's Title" getData={getBooks} />,
            <CreateBookModal />,
            <Pagination
              pagination={pagination}
              getData={getBooks}
              textSearch={textSubSearch}
            />,
          ]}
        >
          {loading ? <Spinner /> : <TableBooks dataSource={books} />}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default AdminBooks;
