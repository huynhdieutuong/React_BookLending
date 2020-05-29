import React, { useEffect, useContext } from 'react';
import { Row, Col, PageHeader, Tabs, Button } from 'antd';

import BookContext from '../../contexts/book/bookContext';

import Spinner from '../layouts/Spinner';

const { TabPane } = Tabs;

const SingleBook = ({ match }) => {
  const { book, loading, getBook } = useContext(BookContext);

  const { _id, coverUrl, title, description } = book;

  useEffect(() => {
    getBook(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Row>
      <Col span={8}>
        <img style={{ width: '100%' }} src={coverUrl} alt={title} />
      </Col>
      <Col span={16}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={title}
          extra={[
            <Button key='3'>Edit</Button>,
            <Button key='2' type='danger'>
              Delete
            </Button>,
            <Button key='1' type='primary'>
              Borrow
            </Button>,
          ]}
          footer={
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Details' key='1' />
              <TabPane tab='Reviews' key='2' />
            </Tabs>
          }
        >
          {description}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default SingleBook;
