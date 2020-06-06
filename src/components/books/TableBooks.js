import React from 'react';
import { Table, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import EditBookModal from './EditBookModal';
import DeleteBook from './DeleteBook';

const TableBooks = ({ dataSource }) => {
  const columns = [
    {
      title: 'Cover',
      key: 'cover',
      render: (book) => {
        return (
          <img style={{ width: '50px' }} src={book.coverUrl} alt='cover' />
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => (
        <>
          <p style={{ maxWidth: '300px' }}>{title}</p>
        </>
      ),
    },
    {
      title: 'Create Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return <>{<Moment format='DD-MM-YYYY HH:mm'>{date}</Moment>}</>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (book) => (
        <Row size='middle'>
          <Col flex='30%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <Button type='primary'>
              <Link to={`/books/${book._id}`}>View</Link>
            </Button>
          </Col>
          <Col flex='30%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <EditBookModal book={book} />
          </Col>
          <Col flex='30%'>
            <DeleteBook id={book._id} />
          </Col>
        </Row>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default TableBooks;
