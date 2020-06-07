import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, PageHeader, Descriptions, Tag, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import TransactionContext from '../../contexts/transaction/transactionContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import NotFound from '../layouts/NotFound';

import DeleteTransaction from './DeleteTransaction';
import EditTransaction from './EditTransaction';

const SingleTransaction = ({ match, history }) => {
  const { transaction, loading, getTransaction, daysBorrow } = useContext(
    TransactionContext
  );
  const authState = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getTransaction(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  if (!transaction) return <NotFound />;

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
              <Button type='primary' onClick={() => setVisible(true)}>
                Edit
              </Button>,
              <DeleteTransaction id={_id} history={history} />,
            ]
          }
        >
          <Descriptions size='small' column={1}>
            {authState.user.isAdmin && (
              <Descriptions.Item label='User'>
                {user && <Link to={`/users/${user._id}`}>{user.name}</Link>}
              </Descriptions.Item>
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
          {books &&
            books.map((book) => (
              <Col
                span={6}
                style={{ height: 200, margin: '5px 0' }}
                key={book._id}
              >
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
      <Modal
        title='Edit Transaction'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <EditTransaction setVisible={setVisible} single={true} />
      </Modal>
    </Row>
  );
};

export default SingleTransaction;
