import React, { useContext, useState } from 'react';
import { Table, Tag, Space, Button, message } from 'antd';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import TransactionContext from '../../contexts/transaction/transactionContext';

const TableTransactions = ({ dataSource, isAdmin }) => {
  const { daysBorrow, deleteTransaction } = useContext(TransactionContext);
  const [disabled, setDisabled] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Books',
      dataIndex: 'books',
      key: 'books',
      render: (books) => <>{books.length}</>,
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
        <Space size='middle'>
          <Button type='primary'>
            <Link to={`/transactions/${transaction._id}`}>View</Link>
          </Button>
          {isAdmin && <Button type='ghost'>Edit</Button>}
          {isAdmin && (
            <Button
              type='danger'
              disabled={disabled}
              onClick={async () => {
                const hide = message.loading('Action in progress..', 0);

                setDisabled(true);
                await deleteTransaction(transaction._id);

                setDisabled(false);
                setTimeout(hide, 0);
                message.success(`Transaction ${transaction._id} deleted`);
              }}
            >
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (isAdmin) {
    columns.splice(2, 0, {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    });
  }

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default TableTransactions;
