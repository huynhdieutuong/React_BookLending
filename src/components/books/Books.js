import React, { useEffect, useContext } from 'react';
import { Row } from 'antd';

import BookContext from '../../contexts/book/bookContext';

import BookItem from './BookItem';
import Spinner from '../layouts/Spinner';

const Books = () => {
  const { books, loading, pagination, getBooks } = useContext(BookContext);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className='site-card-wrapper'>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {books.length > 0 &&
          books.map((book) => <BookItem key={book._id} book={book} />)}
      </Row>
    </div>
  );
};

export default Books;
