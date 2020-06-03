import React, { useEffect, useContext } from 'react';
import { Row, Col, PageHeader, Button, Descriptions, Tag } from 'antd';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import TransactionContext from '../../contexts/transaction/transactionContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';

const SingleTransaction = ({ match }) => {
  const { transaction, loading, getTransaction, daysBorrow } = useContext(
    TransactionContext
  );
  const authState = useContext(AuthContext);

  useEffect(() => {
    getTransaction(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!transaction || loading) return <Spinner />;

  const { _id, books, user, date, isComplete } = transaction;

  // Calculate expire date
  const expDate = Date.parse(date) + daysBorrow;
  const nowDate = new Date();

  let isExpired = false;
  if (nowDate.getTime() > expDate) {
    isExpired = true;
  }

  return (
    <Row>
      <Col span={8}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={_id}
          extra={
            authState.user.isAdmin && [
              <Button key='3' type='primary'>
                Edit
              </Button>,
              <Button key='2' type='danger'>
                Delete
              </Button>,
            ]
          }
        >
          <Descriptions size='small' column={1}>
            {authState.user.isAdmin && (
              <Descriptions.Item label='User'>{user}</Descriptions.Item>
            )}
            <Descriptions.Item label='Status'>
              {' '}
              <Tag
                color={
                  isComplete ? 'green' : isExpired ? 'volcano' : 'geekblue'
                }
              >
                {isComplete ? 'Completed' : isExpired ? 'Expired' : 'Borrowing'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='Return Date'>
              {<Moment format='DD-MM-YYYY HH:mm'>{expDate}</Moment>}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Col>
      <Col span={16}>
        <Row gutter={8}>
          {books.map((book) => (
            <Col span={6} style={{ height: 200, margin: '5px 0' }}>
              <Link to={`/books/${book._id}`}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={book.coverUrl}
                  alt={book.title}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default SingleTransaction;
