import React, { useEffect, useContext } from 'react';
import { Row, Col, PageHeader } from 'antd';

import TransactionContext from '../../contexts/transaction/transactionContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import Pagination from '../layouts/Pagination';
import TableTransactions from './TableTransactions';
import CreateTransactionModal from './CreateTransactionModal';
import SubSearchBar from '../layouts/SubSearchBar';

const Transactions = () => {
  const { transactions, pagination, loading, getTransactions } = useContext(
    TransactionContext
  );

  const { user } = useContext(AuthContext);

  const textSubSearch = localStorage.getItem('textSubSearch') || '';

  useEffect(() => {
    getTransactions(textSubSearch);
    localStorage.setItem('currentMenu', 'transactions');
    // eslint-disable-next-line
  }, []);

  return (
    <Row>
      <Col span={24}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title='Transactions'
          extra={[
            <SubSearchBar
              placeholder="Type transaction's ID"
              getData={getTransactions}
            />,
            user.isAdmin && <CreateTransactionModal />,
            <Pagination
              pagination={pagination}
              getData={getTransactions}
              textSearch={textSubSearch}
            />,
          ]}
        >
          {loading ? (
            <Spinner />
          ) : (
            <TableTransactions
              dataSource={transactions}
              isAdmin={user.isAdmin}
            />
          )}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default Transactions;
