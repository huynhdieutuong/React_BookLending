import React, { Fragment, useState } from 'react';
import { Radio } from 'antd';

const Pagination = ({
  pagination: { page, prev, next },
  getBooks,
  perPage,
}) => {
  const [currentPage, setCurrentPage] = useState(page);

  return (
    <Radio.Group
      value={currentPage}
      onChange={(e) => {
        setCurrentPage(e.target.value);
        if (e.target.value === 'prev') {
          getBooks(perPage, prev);
        } else if (e.target.value === 'next') {
          getBooks(perPage, next);
        } else {
          getBooks(perPage, e.target.value);
        }
      }}
    >
      {prev && (
        <Fragment>
          <Radio.Button value={'prev'}>Prev</Radio.Button>
          <Radio.Button value={prev}>{prev}</Radio.Button>
        </Fragment>
      )}
      <Radio.Button value={page}>{page}</Radio.Button>
      {next && (
        <Fragment>
          <Radio.Button value={next}>{next}</Radio.Button>
          <Radio.Button value={'next'}>Next</Radio.Button>
        </Fragment>
      )}
    </Radio.Group>
  );
};

export default Pagination;
