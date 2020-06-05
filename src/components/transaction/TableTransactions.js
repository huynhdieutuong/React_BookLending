import React, { useContext } from 'react';
import { Table, Tag, Row, Col, Button } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import EditTransactionModal from './EditTransactionModal';
import DeleteTransaction from './DeleteTransaction';

import TransactionContext from '../../contexts/transaction/transactionContext';

const TableTransactions = ({ dataSource, isAdmin }) => {
  const { daysBorrow } = useContext(TransactionContext);

  const columns = [
    {
      title: 'Books',
      dataIndex: 'books',
      key: 'books',
      render: (books) => (
        <>
          {books.map((book, index) => (
            <p style={{ maxWidth: '300px' }}>
              {index + 1} - {book.title}
            </p>
          ))}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'isComplete',
      dataIndex: 'isComplete',
      render: (isComplete, transaction) => {
        const expDate = Date.parse(transaction.date) + daysBorrow;
        const nowDate = new Date();

        let isExpired = false;
        if (nowDate.getTime() > expDate) {
          isExpired = true;
        }

        return (
          <>
            {
              <Tag
                color={
                  isComplete ? 'green' : isExpired ? 'volcano' : 'geekblue'
                }
              >
                {isComplete ? 'Completed' : isExpired ? 'Expired' : 'Borrowing'}
              </Tag>
            }
          </>
        );
      },
    },
    {
      title: 'Return Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        const expDate = Date.parse(date) + daysBorrow;
        return <>{<Moment format='DD-MM-YYYY HH:mm'>{expDate}</Moment>}</>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (transaction) => (
        <Row size='middle'>
          <Col flex='30%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <Button type='primary'>
              <Link to={`/transactions/${transaction._id}`}>View</Link>
            </Button>
          </Col>
          <Col flex='30%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            {isAdmin && <EditTransactionModal transaction={transaction} />}
          </Col>
          <Col flex='30%'>
            {isAdmin && <DeleteTransaction id={transaction._id} />}
          </Col>
        </Row>
      ),
    },
  ];

  if (isAdmin) {
    columns.unshift({
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <>{<Link to={`/users/${user._id}`}>{user.name}</Link>}</>
      ),
    });
  }

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default TableTransactions;
