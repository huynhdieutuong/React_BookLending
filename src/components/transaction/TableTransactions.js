import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import Moment from 'react-moment';

const TableTransactions = ({ dataSource, isAdmin }) => {
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
        const expDate = Date.parse(transaction.date) + 14 * 24 * 60 * 60 * 1000;
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <>{<Moment format='DD-MM-YYYY HH:mm'>{date}</Moment>}</>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_id) => (
        <Space size='middle'>
          <Button type='primary'>View</Button>
          {isAdmin && <Button type='ghost'>Edit</Button>}
          {isAdmin && <Button type='danger'>Delete</Button>}
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
