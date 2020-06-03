import React, { useEffect, useContext } from 'react';
import { Row } from 'antd';

import BookContext from '../../contexts/book/bookContext';

import BookItem from './BookItem';
import Spinner from '../layouts/Spinner';
import Pagination from '../layouts/Pagination';

const Books = ({ location }) => {
  const { books, loading, pagination, getBooks } = useContext(BookContext);
  const textSearch = localStorage.getItem('textSearch') || '';

  useEffect(() => {
    if (location.pathname === '/') {
      localStorage.removeItem('textSearch');
      getBooks();
    }

    if (location.pathname === '/search') {
      getBooks(textSearch);
    }

    // eslint-disable-next-line
  }, [location]);

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
          textSearch={textSearch}
        />
      </Row>
    </div>
  );
};

export default Books;
