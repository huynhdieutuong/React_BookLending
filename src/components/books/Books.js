import React, { useEffect, useContext } from 'react';
import { Row, Col } from 'antd';

import BookContext from '../../contexts/book/bookContext';

import BookItem from './BookItem';
import Spinner from '../layouts/Spinner';
import Pagination from '../layouts/Pagination';

const Books = () => {
  const { books, loading, pagination, getBooks } = useContext(BookContext);
  const perPage = 10;

  useEffect(() => {
    getBooks(perPage);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className='site-card-wrapper'>
      <Row justify='space-between' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {books.length > 0 &&
          books.map((book) => <BookItem key={book._id} book={book} />)}
      </Row>
      <Row justify='end' style={{ marginTop: '20px' }}>
        <Pagination
          pagination={pagination}
          getBooks={getBooks}
          perPage={perPage}
        />
      </Row>
    </div>
  );
};

export default Books;
