import React, { Fragment, useState, useContext } from 'react';
import { Table, Row, Col, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import EditBook from './EditBook';
import DeleteBook from './DeleteBook';

import BookContext from '../../contexts/book/bookContext';

const TableBooks = ({ dataSource }) => {
  const { setBook } = useContext(BookContext);
  const [visible, setVisible] = useState(false);

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
            <Button
              type='primary'
              onClick={() => {
                setBook(book);
                setVisible(true);
              }}
            >
              Edit
            </Button>
          </Col>
          <Col flex='30%'>
            <DeleteBook id={book._id} />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Fragment>
      <Table columns={columns} dataSource={dataSource} pagination={false} />{' '}
      {visible && (
        <Modal
          title='Edit Book'
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <EditBook setVisible={setVisible} />
        </Modal>
      )}
    </Fragment>
  );
};

export default TableBooks;
